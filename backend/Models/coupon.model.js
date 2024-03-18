const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:Number,
    type:{
        enum:['time','60day','count'],
        type:String,
    },
    status:{
        type:String
    },
    period:{
        type:Number,
        default:0
    },  
    count:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    }
})

const Coupon = mongoose.model('coupon', couponSchema);
module.exports = Coupon;