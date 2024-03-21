const { Router } = require("express");
const orderController = require("../Controllers/order.controller");
const { verifyToken } = require("../Utils/jwt.utils");

const router = Router()
router.post('/shop-orders', verifyToken, orderController.getShopOrders)
router.get('/orders/:limit', verifyToken, orderController.getUserOrders)

router.post('/buy-product', verifyToken, orderController.buyProduct)
router.post('/order-details', verifyToken, orderController.getOrder)

router.post('/update-order', verifyToken, orderController.updateOrderStatus)

//admin action
router.post('/update-order-payment', orderController.updOrderPayment)
module.exports = router