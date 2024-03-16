const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['general','fashion'],
        default:'general'
    },
    platformCharge:{
        type:Number,
        default:0
    },
    description:String,
    createdAt:{type:Date, default:Date.now()}
})

const Category = mongoose.model('Category', categoryModel)
module.exports = Category ;