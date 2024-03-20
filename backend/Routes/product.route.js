const { Router } = require("express");
const productController = require("../Controllers/product.controller");

const router=Router()
const {upload,handleMulterError} = require('../Middlewares/images');
const { verifyToken } = require("../Utils/jwt.utils");

//take searchedkey and size
router.get('/pending-products',verifyToken, productController.getPendingProducts)
router.get('/get-products', productController.getProducts)
router.post('/search-products', productController.searchProducts)
//take category and product type and size 
router.post('/search-by-category', productController.getByCategory)
//give us a brief detail of product take productType(required) nd shopId
router.post('/v/:productId', productController.getProduct)

router.post('/add-new-product', verifyToken, upload,handleMulterError, productController.addProduct)

router.post('/add-existing-product',verifyToken, productController.addExistingProduct)
router.post('/edit-product',verifyToken, productController.editProduct)

//admin action
router.post('/approve-product',verifyToken, productController.approveProduct)

router.get('/get-categories/:type', productController.getCategories)
module.exports = router