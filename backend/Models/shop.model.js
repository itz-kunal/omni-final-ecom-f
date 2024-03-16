const mongoose = require('mongoose');

const shopSchema = ({
    name: {
        type: String,
        required: true
    },
    uniqueName:String,
    phone:Number,
    email:String,
    GST:String,
    description:String,

    shopImage:String,
   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    location: {
        type:{
            type:String,
            default:'Point'
        },
        coordinates:[String]
    },
    address: {
        address: String,
        street: String,
        city: String,
        state: String,
        pincode: Number,
        country: String
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true
        },
       productType:{
        type:String,
        enum:['general', 'fashion'],
        default:'general'
       }
    }],

    status:{
        type:String,
        enum:['pending','approved'],
        default:'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;