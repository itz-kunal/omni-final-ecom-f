require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./Routes/user.route');
const adminRoutes = require('./Routes/admin.route');
const couponRoutes = require('./Routes/coupon.route');
const walletRoutes = require('./Routes/wallet.route');
const orderRoutes = require('./Routes/order.route');
const productRoutes = require('./Routes/product.route');
const shopRoutes = require('./Routes/shop.route')


const app = express();
const port = process.env.PORT || 80;

// db connection
const mongo_uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/omitrek';
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
}).then(() => console.log('connected to database')).catch(err => {
    console.log('error in connecting to db', err.message)
})

//for getting cookies
app.use(cookieParser())
//for receiving json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for getting form data 


app.use(session({
    secret: process.env.SESSION_SECRET || 'Omi_trek&@79127#$',
    resave: true,
    saveUninitialized: true
}));
app.use(cors({
    // orign:'http://localhost:3000',
    origin: 'https://omni-final-ecom-latest.vercel.app/', 
    // orign:'*',
    credentials: true // Allow cookies to be sent from the frontend
}))

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/coupon', couponRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/wallet', walletRoutes);
app.use('/shop', shopRoutes)


app.listen(port, (err) => {
    if (err) {
        console.log('error in starting server', err)
    } else {
        console.log(`server started on https://localhost:${port}`)
    }
})
