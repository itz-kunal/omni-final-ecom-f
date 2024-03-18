const { Router } = require("express");
const adminController = require("../Controllers/admin.controller");
const isAuthenticated = require('../Middlewares/auth');

const router = Router();
router.get('/all-users', adminController.getAllUsers);
router.post('/search-users', adminController.searchUser);
router.post('/delete-user', adminController.deleteUser);

router.get('/general-products', adminController.getGeneralProducts);
router.get('/fashion-products', adminController.getFashionProducts);
router.get('/pending-orders', adminController.getPendingOrders);
router.get('/all-orders', adminController.getAllOrders);
// router.get('/pending-orders')
router.get('/all-transactions', adminController.getAllTransactions);

router.post('/approve-payment',  adminController.approveTransaction);
router.post('/add-category', adminController.addCategory)

module.exports = router ;
