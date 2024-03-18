const Coupon = require('../Models/coupon.model');
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
        amount,type
    } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({msg:`user doesn't exist ! please login again.`})
        }

        if(user.omniCoin < amount){
            return res.send({msg:'insufficient balance please toup !'})
        }
       
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

        const referral = await User.findOne({
            referralCode: user.referredBy
        })
        if (referral) {
            referral.earning += refwin
            referral.coupons.push({
                amount,
                win: refwin,
                type: 'time',
            })
            await referral.save();
        }

        if(type == '60day'){
            const coupon = new Coupon({
                amount,
                type,
                user:user._id,
                count:1
            })

            user.coupons.push({
                amount,
                type,
                win
            })

            await Promise.all([coupon.save(), user.save()])

            return res.send({msg:`you bought it successfully this time win is ₹${win}`})
        }

        user.omniCoin -= amount
        user.coupons.push({
            type: 'time',
            amount,
            win,
        })

        user.earning+=win
      
    
        await user.save();
        return res.send({msg:`You won ₹${win}`});

    } catch (err) {
        console.error('error in buying coupon at coupon controller', err);
        return res.send({msg:'something went wrong ! try again.'})
    }
};

//send coupons to user
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

//admin action
const send60Coupon = async(req,res)=>{
    try{
        const {schCouponId} = req.body;
        const coupon = await Coupon.findById(schCouponId).populate('user');
        if(coupon.type !== '60day' || coupon.count > 60){
            return res.status(400).send({msg:'invalid attempt either 60 days passes or invalid coupon'})
        }

        let win = getRandomNumber(50,150);

        coupon.user.coupons.push({
            amount:coupon.amount,
            win,            
        })
        coupon.count += 1;
        await Promise.all([coupon.user.save(), coupon.save()]);
        return res.send({msg:'coupon sent to user successfully !'})

    }catch (err) {
        console.error('error in sending60Coup coupon at coupon controller', err);
        return res.send({msg:'something went wrong ! try again.'})
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

const couponController = {
    buyCoupon,
    getCoupons,
    send60Coupon
}

module.exports = couponController;