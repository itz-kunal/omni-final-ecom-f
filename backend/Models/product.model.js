const mongoose = require('mongoose');

const fashionProductSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    platformCharge: Number,
    price: {
        type: Number,
        require: true
    },
    quantity:Number,

    rate:Number,
    reviews:[
        {
            userName:String,
            message:String,
            rate:Number,
            images:[]
        }
    ],

    images: [{
        name: String,
        url: String
    }],

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },

    addedAt: {
        type: Date,
        default: Date.now()
    },

    linkedCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const generalProductSchema = new mongoose.Schema({
    name:{type:String, text: true, require:true},
    description:{type:String, require:true},
    category:{type:String, require:true},
    platformCharge:Number,
    price:{type:Number, require:true},
   

    images:[{
        name:String,
        url:String
    }],
 
    shops:[{
        shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop'
        },
        price:Number,
        quantity:Number
    }],

    addedAt:{type:Date, default:Date.now()},

    linkedCategory:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}
})

const pendingProductSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    productType:{
        type:String,
        enum:['fashion','general'],
        default:'fashion'
    },
    category: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },
    quantity:Number,
    images: [{
        name: String,
        url: String
    }],
  
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    addedAt: {
        type: Date,
        default: Date.now()
    },

    linkedCategory:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}

})


const PendingProduct = mongoose.model('pendingProduct', pendingProductSchema);

generalProductSchema.index({name:'text'});
const GeneralProduct = mongoose.model('Product',generalProductSchema); 

fashionProductSchema.index({
    name: 'text'
});
const FashionProduct = mongoose.model('FashionProduct', fashionProductSchema);
module.exports = {GeneralProduct, FashionProduct, PendingProduct};