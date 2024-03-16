const Transaction = require('../Models/transactions.model');
const User = require('../Models/user.model');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Buy copuns
const buyCoupon = async (req, res) => {
    const {
        userId
    } = req.user;
    const {
        amount
    } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send(`user doesn't exist ! please login again.`)
        }

        if(user.omniCoin < amount){
            return res.send('insufficient balance please toup !')
        }
        // const transaction = new Transaction({
        //     upi,
        //     amount,
        //     paidFor: 'coupon',
        //     user: userId
        // })

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


        user.omniCoin -= amount
        user.coupons.push({
            type: 'scratch',
            amount,
            win,
        })

        user.earning+=win
      
        const referral = await User.findOne({
            referralCode: user.referredBy
        })

        if (referral) {
            referral.earning += refwin
            referral.coupons.push({
                amount,
                win: refwin,
                type: 'scratch',
            })
            await referral.save();
        }

        await user.save();
        return res.send(`You won ₹${win}`);

    } catch (err) {
        console.error('error in buying coupon at coupon controller', err);
        return res.send('something went wrong ! try again.')
    }
};

const getCoupons = async(req,res)=>{
    try{
        const {userId} = req.user;

        const user = await User.findById(userId);

        return res.send(user.coupons)
    }catch (err) {
        console.error('error in getting coupon at coupon controller', err);
        return res.send('something went wrong ! try again.')
    }
}

// const updCouponStatus = async (userId, couponId, customWin, status) => {
//     try {
//         const user = await User.findById(userId);
//         const couponIndex = user.coupons.findIndex(elem => elem._id.equals(couponId));
//         const coupon = user.coupons[couponIndex];

//         if (status != 'approve') {
//             user.coupons.splice(couponIndex, 1);
//             await user.save();
//             return true;
//         }
//         if (coupon.status == 'approved'){
//             throw new Error('coupon has already approved')
//         }

//         if (coupon.type == 'scratch') {
//             const amount = coupon.amount;

//             coupon.status = 'approved';
//             user.balance2 += amount;
//             if(customWin){
//                 coupon.win = customWin;
//             }

//             await user.save();

//             let refwin;
//             if (amount == 20) {
//                 refwin = getRandomNumber(0, 5)
//             } else if (amount == 100) {
//                 refwin = getRandomNumber(10, 20)
//             } else if (amount == 500) {
//                 refwin = getRandomNumber(30, 100)
//             } else if (amount == 1000) {
//                 refwin = getRandomNumber(70, 150)
//             }

//             const referral = await User.findOne({
//                 referralCode: user.referredBy
//             })

//             if (referral) {
//                 referral.coupons.push({
//                     amount,
//                     win: refwin,
//                     type: 'scratch',
//                     status: 'approved'
//                 })
//                 await referral.save();
//             }
//         }

//         return true;
//     } catch (err) {
//         throw err
//     }
// }

const openScratch = async (req, res) => {
    const cardId = req.body.cardId;
    try {
        const cardUser = await User.findOne({
            'coupons._id': cardId
        })

        if (!cardUser) {
            return res.status(401).send('invalid user for opening coupon')
        }

        const card = cardUser.coupons.find(elem => elem._id == cardId)

        if(card.status == 'opened'){
            return res.status(402).send('coupon has already opened')
        }

        card.status = 'opened';
        cardUser.balance2 += card.win*0.2 ;
        cardUser.balance += card.win*0.8 ;
        
        await cardUser.save();
        return res.send(card)
    } catch (err) {
        console.error('error in opening scratch at coupon controller', err)
        return res.status(500).send('Internal server error ! try again')
    }
};

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

const couponController = {
    buyCoupon,
    openScratch,
    // updCouponStatus
    getCoupons
}

module.exports = couponController;