const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    productType:{
        type:String,
        enum:['general','fashion'],
        default:'general'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productName:String,
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },

    phone: Number,
    prodImage: String,
    userName: {
        type: String,
        required: true
    },
    payableAmount:{
        type: Number,
        default:0
    },
    totalPrice: {
        type: Number,
        default:0,
        required: true
    },
    couponApplied: [String],
    couponDiscount: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
    },
    quantity: {
        type: Number,
    },

    paymentMode:String,
    shippingAddress: {
        street: String,
        address: String,
        city: String,
        state: String,
        country: String,
        pincode: Number,
    },

    orderStatus: {
        type: String,
        enum:['processing','shipped','delivered','returning','returned','cancelled'],
        default: "processing",
    },
    paymentStatus:{
        type:String,
        enum:['paid','unpaid'],
        default:'unpaid'
    },
    paidAt:Date,
    deliveredAt: Date,
    cancelledAt: Date,
    shippededAt: Date,
    returnedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // paymentType: String
})

const PendingOrder = mongoose.model('pendingOrder', orderSchema)
const Order = mongoose.model('Order', orderSchema)

module.exports = {Order, PendingOrder}
