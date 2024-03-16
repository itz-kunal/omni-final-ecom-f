const { Router } = require("express");
const couponController = require("../Controllers/coupon.controller");
const { verifyToken } = require("../Utils/jwt.utils");

const router = Router();
router.post('/buy-coupon', verifyToken, couponController.buyCoupon);
router.post('/open-scratch', verifyToken, couponController.openScratch)
router.get('/get-coupons',verifyToken, couponController.getCoupons)


module.exports = router ;