const {Order, PendingOrder} = require("../Models/order.model");
const Transaction = require("../Models/transactions.model");
const Shop = require('../Models/shop.model');
const User = require('../Models/user.model');

const sendMail = require("../Functions/sendMail");
const saveDocs = require('../Middlewares/saveDocs');

//send a detailed info of order even if user or admin or seller
const getOrder = async(req,res)=>{
    try{
        const {userId} = req.user;
        const {shopId} = req.shop
        const {orderId} = req.body;

        const order = await Order.findById(orderId)
        if(!order.user.equals(userId)&&!order.user.equals(shopId)){
            return res.send('sorry but it seems this is not your order')
        }
        
        return res.send(order)
    }catch(err){
        console.error('error in get order at order controller', err);
        return res.status(500).send('internal server error please try again')
    }
}

//change status of prod user also included
const updateOrderStatus = async (req, res) => { 
    try {
        const {userId} = req.user;
        const {
            shopId
        } = req.shop;
        const {
            updator,
            orderId,
            status
        } = req.body;

        if(updator == 'user' && (status == 'shipped' || status == 'delivered')){
            return res.send('invalid action !')
        };
        // const shop = await Shop.findById(shopId);
        const order = await PendingOrder.findById(orderId);
        if (!order) {
            return res.status(201).send({msg:'invalid order!'})
        }
       
        if (!order.shop.equals(shopId) && !order.user.equals(userId)) {
            return res.status(201).send({msg:'invalid attempt the order is not in your list !'})
        }

        order.status = status;
        order[`${status}At`] = Date.now();

        User.findById(order.user).then(res => {
            console.log(res)
            sendMail(res.email, 'Order on Omitrek', `your order on omitrek has been ${status}ed`)
        })

        if (status == 'delivered') {
            const finalOrder = new Order(order);
            await finalOrder.save()
            await order.deleteOne();
            return res.send({msg:`order status changed to delivered successfully`})

        }
        await order.save();
        return res.send({msg:`order status changed to ${status} successfully`})

    } catch (err) {
        console.error('error in changing orders status at shop controller', err);
        return res.status(500).send({msg:'something went wrong try again'})
    }
}

const buyProduct = async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
  
      let {
        phone,
        productType,
        productId,
        shopId,
        quantity,
        size,
        discount50,
        discount2,
        balance,
        shippingAddress,
        location,
        paymentMode,
      } = req.body;
  
      // let shop;
      // if (!req.body.shopId && productType == 'general') {
      //     const nearestShop = await Shop.aggregate([{
      //         $match: {
      //             '$products.product': productId,
      //         }
      //     }, {
      //         $geoNear: {
      //             near: {
      //                 type: 'Point',
      //                 coordinates: [location.longitude, location.latitude],
      //             },
      //             key: 'location',
      //             distanceMultiplier: 6371,
      //             maxDistance: maxDistance || (500 * 1000),
      //             distanceField: 'distance',
      //             spherical: true
      //         }
      //     }, {
      //         $limit: 1
      //     }])
  
      //     shop = nearestShop;
      // }
  
      const product =
        productType == "general"
          ? await GeneralProduct.findById(productId)
          : await FashionProduct.findById(productId);
  
      // if (req.body.shopId) {
      //     shop = await Shop.findById(shopId);
      // }
      console.log("user", user);
      console.log("product", product);
      // console.log("shop",shop)
  
      if (!user || !product) {
        return res.status(402).send("something went wrong in fetching try again");
      }
  
      // if (!user || !product || !shop) {
      //     return res.status(402).send('something went wrong in fetching try again')
      // }
      // let productAtSeller;
      // if (productType == 'general') {
      //     productAtSeller = product.shops.find(shop => shop.shop.equals(shopId))
      // } else {
      //     productAtSeller = product
      // }
      // console.log("quantity",quantity)
      // console.log("productAtSeller",productAtSeller)
      // console.log("productAtSeller.quantity",productAtSeller.quantity)
  
      // if (productAtSeller.quantity < quantity) {
      //     return res.send(`seller don't have enough product only ${productAtSeller.quantity} qty left`)
      // }
  
      const payableAmount = product.price * quantity;
      let discount = 0;
      //for giving 2 % coupon discount
      if (discount2) {
        const minus2 = (2 * payableAmount) / 100;
        if (minus2 < user.balance2) {
          discount += minus2;
        } else {
          discount += user.balance2;
        }
      }
      //for giving 50 % coupon discount
      if (discount50) {
        const minus50 = (50 * payableAmount) / 100;
        if (minus50 < user.balance50) {
          discount += minus50;
        } else {
          discount += user.balance50;
        }
      }
      //for buying from topup balance
      if (balance) {
        if (payableAmount < user.balance) {
          discount += payableAmount;
        } else {
          discount += user.balance;
        }
      }
  
      let transaction;
  
      paymentMode === "online"
        ? (transaction = new Transaction({
            user: userId,
            paidFor: "product",
            upi,
            amount: payableAmount,
          }))
        : undefined;
  
      const order = new PendingOrder({
        user: userId,
        shop: shopId,
        product: productId,
        phone: phone || user.phone,
        image: product.images[0],
        totalPrice: product.price * quantity,
        payableAmount: payableAmount - discount,
        paymentStatus: payableAmount == 0 ? "paid" : "unpaid",
        paymentMode,
        shippingAddress,
        transaction: paymentMode == "online" ? transaction._id : "",
        quantity,
        size,
      });
  
      if (paymentMode == "online") {
        transaction.paidForDetail = order._id;
        await transaction.save();
      }
  
      const savedOrder = await order.save();
      console.log(savedOrder._id);
      return res.json({ msg: "order placed successfully", id: savedOrder._id });
    } catch (error) {
      console.error("Error saving order:", error);
      return res.status(402).json({ msg: "Something went Wrong" });
    }
  };

//buy products from nearest store if store id not given
// const buyProduct = async (req, res) => {
//     try {
//         const {
//             userId,
//         } = req.user;
//         const user = await User.findById(userId);

//         let {
//             productType,
//             productId,
//             shopId,
//             quantity,
//             size,
//             discount50,
//             discount2,
//             balance,

//             shippingAddress,
//             location,
//             paymentMode
//         } = req.body;

//         let shop;
//         if (!req.body.shopId && productType == 'general') {
//             const nearestShop = await Shop.aggregate([{
//                 $match: {
//                     '$products.product': productId,
//                 }
//             }, {
//                 $geoNear: {
//                     near: {
//                         type: 'Point',
//                         coordinates: [location.longitude, location.latitude],
//                     },
//                     key: 'location',
//                     distanceMultiplier: 6371,
//                     maxDistance: maxDistance || (500 * 1000),
//                     distanceField: 'distance',
//                     spherical: true
//                 }
//             }, {
//                 $limit: 1
//             }])

//             shop = nearestShop;
//         }

//         const product = productType == 'general' ? await GeneralProduct.findById(productId) : await FashionProduct.findById(productId);

//         if (req.body.shopId) {
//             shop = await Shop.findById(shopId);
//         }

//         if (!user || !product || !shop) {
//             return res.status(402).send('something went wrong in fetching try again')
//         }
//         let productAtSeller;
//         if (productType == 'general') {
//             productAtSeller = product.shops.find(shop => shop.shop.equals(shopId))
//         } else {
//             productAtSeller = product
//         }

//         if (productAtSeller.quantity < quantity) {
//             return res.send(`seller don't have enough product only ${productAtSeller.quantity} qty left`)
//         }

//         const payableAmount = product.price * quantity;
//         let discount = 0;
//         //for giving 2 % coupon discount
//         if (discount2) {
//             const minus2 = 2 * payableAmount / 100
//             if (minus2 < user.balance2) {
//                 discount += minus2
//             } else {
//                 discount += user.balance2
//             }
//         }
//         //for giving 50 % coupon discount
//         if (discount50) {
//             const minus50 = 50 * payableAmount / 100
//             if (minus50 < user.balance50) {
//                 discount += minus50
//             } else {
//                 discount += user.balance50
//             }
//         }
//         //for buying from topup balance
//         if (balance) {
//             if (payableAmount < user.balance) {
//                 discount += payableAmount
//             } else {
//                 discount += user.balance
//             }
//         }

//         const transaction = new Transaction({
//             user: userId,
//             paidFor: 'product',
//             upi,
//             amount: payableAmount
//         })

//         const order = new PendingOrder({
//             user: userId,
//             shop: shopId,
//             product: productId,
//             phone: user.phone,
//             image: product.images[0],
//             totalPrice: product.price * quantity,
//             payableAmount: payableAmount - discount,
//             paymentStatus: payableAmount == 0 ? 'paid' : 'unpaid',
//             paymentMode,
//             shippingAddress,
//             transaction: paymentMode == 'online' ? transaction._id : '',
//             quantity,
//             size
//         })

//         if (paymentMode == 'online') {
//             transaction.paidForDetail = order._id;
//             await transaction.save()
//         }

//         await order.save()
//         return res.send('order placed successfully')

//     } catch (err) {
//         console.error('error in buying product at product controller', err);
//         return res.status(500).send('something went wrong try again');
//     }
// }

//admin action
const updOrderPayment = async (orderId, status) => {
    try {
        const {adminId} = req.admin;
        const order = await PendingOrder.findById(orderId);
        if (!order) {
            return res.send('order not found try again !')
        }

        if (status == 'decline') {
            await order.deleteOne();
            return ({
                msg: 'order deleted successfully',
                status: true
            })
        }

        const admin = await User.findById(adminId);
        admin.receivedPayments += order.amount;

        order.paymentStatus = 'paid';
        order.paidAt = Date.now();

        await saveDocs([order,admin])

        return ({
            msg: 'order updated successfully',
            status: true
        })
    } catch (err) {
        throw err
    }
}

const getUserOrders = async(req,res)=>{
    try{
        const {userId} = req.user;
        const {limit} = req.query;
        const [pendingOrders, completedOrders] = await Promise.all([
            PendingOrder.find({user:userId}),
            Order.find({user:userId}).limit(limit)
        ])

        const orders = [...pendingOrders, ...completedOrders]
        return res.send({msg:'successfull' ,orders})
    }catch(err){
        console.error('error in get user orders at order controller', err);
        return res.status(500).send({msg:'internal server error please try again'})
    }
}

const getShopOrders = async(req,res)=>{
    try{
        const {shopId} = req.shop;
        const {orderType} = req.body;

        let orders ;
        // if(orderType && orderType == 'pending'){
        //     orders = await PendingOrder.find({shop:shopId})
        // }else{
        //     orders = await Order.find({shop:shopId})
        // }

        const orders1 = await PendingOrder.find({shop:shopId})
        const orders2 = await Order.find({shop:shopId})

        orders = [...orders1, ...orders2]
        
        return res.send({msg:'successfull', orders})
    }catch(err){
        console.error('error in getting shop orders at order controller', err);
        return res.status(500).send({msg:'something gonna wrong try again'})
    }
}


const orderController = {
    getOrder,updateOrderStatus,buyProduct,updOrderPayment,getUserOrders,
    getShopOrders
}

module.exports = orderController;