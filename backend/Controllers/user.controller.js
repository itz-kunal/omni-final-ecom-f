require('dotenv').config();
const admin_phone = process.env.ADMIN_PHONE || 9999999999;
const admin_pass = process.env.ADMIN_PASS || 'OMITREK';

const User = require('../Models/user.model')
const {
    hashPassword,
    checkPassword
} = require('../Utils/passwordHass');
const {
    generateToken
} = require('../Utils/jwt.utils');
const generateReferralCode = require('../Utils/referralCode');
const {
    addRefData
} = require('../Functions/referrals')


const register = async (req, res) => {
    const {
        phone,
        referredBy,
        name,
        email,
        password
    } = req.body;

    try {
        const isUserExist = await User.find({
            phone
        })
        if (isUserExist.length > 0) {
            return res.status(400).send({
                mag: 'this phone no. has already registered !'
            })
        }

        const generatedReferralCode = await generateReferralCode();
        const hashedPassword = await hashPassword(password)
        const registerApplication = new User({
            phone,
            referredBy,
            name,
            email,
            password: hashedPassword,
            referralCode: generatedReferralCode
        });


        await registerApplication.save();

        const token = generateToken(registerApplication);
        res.cookie('jwt', token, {
             httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        const userRefBy = registerApplication.referredBy;
        if (userRefBy) {
            addRefData(registerApplication, userRefBy);
        }

        return res.send({
            msg: 'registration successfull !',
            user: {
                phone,
                name,
                email,
                referralCode:generatedReferralCode
            },
            status: true
        })
    } catch (error) {
        console.error('error at user registration', error);
        return res.status(500).send({
            msg: 'Internal Server Error'
        });
    }
};

const login = async (req, res) => {
    const {
        phone,
        password
    } = req.body;
    try {

        if (phone == admin_phone && password == admin_pass) {
            const token = generateToken({
                role: 'admin'
            })
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: "strict",
            })
            return res.send('admin login successfull !')
        }

        const user = await User.findOne({
            phone
        });
        if (!user) {
            return res.status(401).send({
                error: "user doesn't exists please register first"
            })
        }

        const isPassRight = await checkPassword(password, user.password)
        if (!isPassRight) {
            return res.status(400).send({
                error: 'wrong password !'
            })
        }

        const token = generateToken(user);
        res.cookie('jwt', token, {
             httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        return res.send({
            msg: 'Login successfull',
            user: {
                name: user.name,
                role: user.role
            },
            status: true
        })

    } catch (err) {

        console.error('error at login', err);
        return res.status(500).send('something went wrong ! try again.')

    }
};


const getUser = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const user = await User.findById(userId, {
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            genAddress: 1,
            role: 1,
            userInfo: 1,
            referralCode:1,
            omniCoin: 1,
            earning: 1,
            balance: 1,
            balance2: 1,
            balance50: 1
        });

        if (!user) {
            return res.status(404).send({
                msg: 'user not found ! invalid user'
            });
        }


        return res.send({
            msg: 'successfull',
            user
        });
    } catch (err) {
        console.error('error in getting user at user.controller', err);
        return res.status(500).send({
            msg: 'internal server error ! please try again'
        })
    }
}


const updatedProfile = async (req, res) => {
    const {
        userId
    } = req.user;
    const updatedProfile = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updatedProfile, {
            new: true
        });

        if (user) {
            return res.status(404).send('User not found ! try again.');
        }

        delete user.role;
        delete user.password;
        delete user.transactionPassword;

        res.send({
            msg: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('error in updating profile ate user controller', error);
        res.status(500).send('Internal Server Error ! try again');
    }
};
const updatePassword = async (req, res) => {
    const {
        userId
    } = req.user;
    const {
        oldPassword,
        newPassword
    } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({
                msg: 'User not found ! try again'
            });
        }

        // Check if the old password matches the stored password
        const isPassRight = await checkPassword(oldPassword, user.password)
        if (!isPassRight) {
            return res.status(401).send({
                msg: "old password isn't matching ! try again"
            });
        }

        // Update the password
        const hashedNewPassword = await hashPassword(newPassword);
        user.password = hashedNewPassword;
        await user.save();

        return res.send({
            mag: 'Password updated successfully'
        });
    } catch (err) {
        console.error('error in updating password in user controller', err);
        return res.status(500).send({
            msg: 'Internal Server Error ! try again'
        });
    }
};


//get transactions for user 
const getTransactions = async (req, res) => {
    try {
        const {
            userId
        } = req.user;

        const user = await User.findById(userId, {
            receivedCoins: 1,
            sentCoins: 1,
        })

        if (!user) {
            return res.status(404).send({
                msg: 'user not fount try again'
            })
        }

        const {
            receivedCoins,
            sentCoins
        } = user

        return res.send({
            msg: 'successfull',
            receivedCoins,
            sentCoins
        })

    } catch (err) {

        console.error('error in getting received coins in user controller', err);
        res.status(500).send({
            msg: 'Internal Server Error ! try again'
        });
    }
}

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.send('Logout successfully !')
}

const userController = {
    register,
    login,
    getUser,
    logout,
    updatePassword,
    updatedProfile,
    getTransactions
}

module.exports = userController;
