const mongoose = require('mongoose');
const formattedDateTime = require('../Functions/time')

// Define Mongoose Schemas
const couponSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    win: Number,
    type: {
        type: String,
        default: 'scratch'
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
})
const withdrawlSchema = new mongoose.Schema({
    upi: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: String,
    quantity: {
        type: Number,
        default: 1
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: String,

    address: {
        street: String,
        address: String,
        city: String,
        state: String,
        country: String,
        pincode: Number
    },
    genAddress:String,
    role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
        default: 'user'
    },
    userInfo: String,
    password: {
        type: String,
        required: true
    },
    transactionPassword: String,
    referredBy: String,
    referralCode: {
        type: String,
        required: true
    },

    omniCoin: {
        type: Number,
        default: 0
    },
    earning: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    balance2: {
        type: Number,
        default: 0
    },
    balance50: {
        type: Number,
        default: 0
    },
    
    receivedCoins:[{
        phone:Number,
        name: String,
        coins:Number,
        date:Date
    }],
    sentCoins:[{
        phone:Number,
        name: String,
        coins:Number,
        date:Date
    }],

    registrationDate: {
        type: Date,
        default: Date.now()
    },


    cart: [cartItemSchema],
    coupons: [couponSchema],
    referrals: [mongoose.Schema.Types.ObjectId],
    withdrawls: [withdrawlSchema],

    receivedPayments: {
        type: Number,
        default: function () {
            return this.role === 'admin' ? 0 : undefined;
        }
    },
    refundedPayments: {
        type: Number,
        default: function () {
            return this.role === 'admin' ? 0 : undefined;
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;