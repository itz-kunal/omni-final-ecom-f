const {
    promises
} = require('nodemailer/lib/xoauth2');
const {
    Coupon,
    CurrentCoupon
} = require('../Models/coupon.model');
const Transaction = require('../Models/transactions.model');
const User = require('../Models/user.model');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Buy copuns
const appendCoupon = async (userId, amount) => {
    try {
        const user = await User.findById(userId);

        let win;
        if (amount == 20) {
            win = getRandomNumber(0, 5)
        } else if (amount == 100) {
            win = getRandomNumber(10, 20)
        } else if (amount == 500) {
            win = getRandomNumber(30, 100)
        } else if (amount == 1000) {
            win = getRandomNumber(70, 150)
        }

        let refwin;
        if (amount == 20) {
            refwin = getRandomNumber(0, 5)
        } else if (amount == 100) {
            refwin = getRandomNumber(10, 20)
        } else if (amount == 500) {
            refwin = getRandomNumber(30, 100)
        } else if (amount == 1000) {
            refwin = getRandomNumber(70, 150)
        }

        user.coupons.push({
            type: 'time',
            amount,
            win,
        })

        user.earning += (win * 0.8);
        user.balance += (win * 0.8);
        user.balance50 += (win * 0.2);
        user.balance2 += amount;
        const referral = await User.findOne({
            referralCode: user.referredBy
        })

        if (referral) {
            referral.earning += (refwin * 0.8);
            referral.balance += (refwin * 0.8);
            referral.balance50 += (refwin * 0.2);
            referral.coupons.push({
                amount,
                win: refwin,
                type: 'time',
            })
            await referral.save();
        }

        await user.save();
    } catch (err) {
        console.error('error in appending coupon at coupon controller', err);
    }
};

const buyCoupon = async (req, res) => {
    const {
        userId
    } = req.user;
    const {
        type,
        amount,
        couponRefrence
    } = req.body;
    try {
        const user = await User.findById(userId) ;
        if (!user) {
            return res.status(404).send({
                msg: `user doesn't exist ! please login again.`
            })
        }

        if (user.omniCoin < amount) {
            return res.send({
                msg: 'insufficient balance please toup !'
            })
        }

        user.omniCoin -= amount;
        if (type == '60day') {

            const referral = await User.findOne({
                referralCode: user.referredBy
            })
    
            const refwin = getRandomNumber(50, 100);

            if (referral) {
                referral.earning += (refwin * 0.8);
                referral.balance += (refwin * 0.8);
                referral.balance50 += (refwin * 0.2);
                referral.coupons.push({
                    amount,
                    win: refwin,
                    type: 'time',
                })
                await referral.save();
            }
        }

        const coupon = new Coupon({
            user: userId,
            amount,
            type,
            couponRefrence:couponRefrence ? couponRefrence : ''
        })

        await Promise.all([user.save(), coupon.save()])

        return res.send({
            msg: `Coupon bought successfully`
        });

    } catch (err) {
        console.error('error in buying coupon at coupon controller', err);
        return res.send({
            msg: 'something went wrong ! try again.'
        })
    }

}


//send coupons to user
const getCoupons = async (req, res) => {
    try {
        const {
            userId
        } = req.user;

        const user = await User.findById(userId);

        return res.send({
            msg: 'successfull',
            coupons: user.coupons
        })
    } catch (err) {
        console.error('error in getting coupon at coupon controller', err);
        return res.send({
            msg: 'something went wrong ! try again.'
        })
    }
}

//admin action
const allCoupons = async (req,res)=>{
    try{
        const coupons = await Coupon.find({});

        return res.send({msg:'successfull', coupons})
    }catch(err){
        console.error('error in all coup', err)
        return res.status(500).send({msg:'internal server error try again'})
    }
}
const send60Coupon = async (req, res) => {
    try {
        const counpon60s = await Coupon.find({
            type: '60day'
        }).populate('user');
        counpon60s.forEach(coupon => {
            append60Coupon(coupon)
        })

        return res.send({
            msg: 'process started successfully'
        })
    } catch (err) {
        console.error('error in coup controller', err)
        return res.status(500).send({
            msg: 'internal server error try again'
        })
    }
}
const append60Coupon = async (coupon) => {
    try {
        // const {schCouponId} = req.body;
        // const coupon = await Coupon.findById(schCouponId).populate('user');
        if (coupon.type !== '60day' || coupon.count > 40) {
            return res.status(400).send({
                msg: 'invalid attempt either 60 days passes or invalid coupon'
            })
        }

        let win = getRandomNumber(5, 30);

        coupon.user.earning += (0.8 * win);
        coupon.user.balance += (0.8 * win);

        coupon.user.balance50 += (0.8 * win);

        coupon.user.coupons.push({
            amount: coupon.amount,
            win,
        })
        coupon.count += 1;
        await Promise.all([coupon.user.save(), coupon.save()]);
        return res.send({
            msg: 'coupon sent to user successfully !'
        })

    } catch (err) {
        console.error('error in sending60Coup coupon at coupon controller', err);
        return res.send({
            msg: 'something went wrong ! try again.'
        })
    }
}

//send coupon
const sendCoupon = async (req, res) => {
    const {
        senderId
    } = req.user;
    const {
        userId,
        phone,
        coupons
    } = req.body;
    try {
        const sender = await User.findById(senderId);
        // Validate request body
        if (!coupons || !coupons.length) {
            return res.status(400).send('Invalid request. Coupons  =are required.');
        }

        let user;
        if (phone) {
            user = await User.findOne({
                phone
            })
        } else if (userId) {
            user = await User.findById(userId)
        }

        const receivedCoupons = [];
        coupons.forEach(elem => {
            const coupIndex = sender.coupons.findIndex(coup => coup._id == elem)
            receivedCoupons.push(sender.coupons[coupIndex])
            sender.coupons.remove(sender.coupons[coupIndex])
        });
        user.coupons.push(...receivedCoupons)
        await user.save()
        await sender.save()

        return res.status(200).json({
            success: true,
            message: 'Coupons sent successfully.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }

};

const activeCoupons = async (req, res) => {
    try {
        const coupons = await CurrentCoupon.find({});
        res.send({
            msg: 'successfull',
            coupons
        })
    } catch (err) {
        console.error('error in act coupon', err)
        return res.status(500).send({
            msg: 'internl server error'
        })
    }
}
//admin action
const createTimingCoupon = async (name, amount, period) => {
    try {

        const coupon = CurrentCoupon({
            name,
            amount,
            period,
            createdAt: Date.now()
        })

        await coupon.save()

        setTimeout(() => {
            timeCouponClosing(coupon._id, name, amount, period)
        }, period * 60 * 1000);

    } catch (err) {
        console.error('coupon error', err);
    }
}
const timeCouponClosing = async (couponRefrence, name, amount, period) => {
    console.log('hello')
    try {
        createTimingCoupon(name, amount, period)
        const coupon = await CurrentCoupon.findByIdAndDelete(couponRefrence);

        const coupons = await Coupon.find({
            couponRefrence
        });
        coupons.forEach(coupon => {
            appendCoupon(coupon.user, coupon.amount)
        })
    } catch (err) {
        console.error('closing error', err)
    }
}

// createTimingCoupon('hello', 20, 2)

const couponController = {
    allCoupons,
    activeCoupons,
    buyCoupon,
    getCoupons,
    send60Coupon
}

module.exports = couponController;