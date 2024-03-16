const mongoose = require("mongoose");

const withdrawlSchema = new mongoose.Schema({
    user:mongoose.Schema.Types.ObjectId,
    amount:Number,
    withdrawlId:mongoose.Schema.Types.ObjectId,
    upi:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Withdrawl = mongoose.model('withdrawl', withdrawlSchema);

module.exports = Withdrawl;