const { Router } = require("express");
const orderController = require("../Controllers/order.controller");

const router = Router()
router.post('/shop-orders', orderController.getShopOrders)
router.get('/orders/:limit', orderController.getUserOrders)

router.post('/buy-product', orderController.buyProduct)
router.post('/order-details', orderController.getOrder)

router.post('/update-order', orderController.updateOrderStatus)

//admin action
router.post('/update-order-payment', orderController.updOrderPayment)
module.exports = router