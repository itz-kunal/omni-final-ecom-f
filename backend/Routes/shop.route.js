const { Router } = require("express");
const shopController = require("../Controllers/shop.controller");

const router = Router()
const {verifyToken} = require('../Utils/jwt.utils')

//get shop data for user
router.get('/v/:id', verifyToken, shopController.getShop)
//get shop data for seller
router.get('/seller-shop', verifyToken, shopController.getSellerShop)
//get products data for seller
router.get('/shop-products', verifyToken, shopController.shopProducts)

//take location & maxdistance in body and give nearby shops
router.post('/nearby-shops', verifyToken, shopController.getNearByShops)
//take size in body and send shops based on size
router.post('/get-shops', verifyToken, shopController.getShops)
//search shop based on name and unique name
router.post('/search-shop', shopController.searchShop)

//take searched key and shop id and find product in shop
router.post('/search-in-shop', verifyToken, shopController.searchProductInShop)

router.post('/check-name', verifyToken, shopController.checkUniqueName)
router.post('/register-shop', verifyToken, shopController.registerShop)
router.post('/edit-shop', verifyToken, shopController.editShop)

module.exports = router;