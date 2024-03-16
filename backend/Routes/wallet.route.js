const { Router } = require("express");
const walletController = require("../Controllers/wallet.controller");
const { verifyToken } = require("../Utils/jwt.utils");

const router = Router()

router.get('/all-withdrawl', verifyToken, walletController.allWithdrawl)
router.get('/withdrawls',verifyToken, walletController.getWithdrawls);

router.post('/send-money',verifyToken, walletController.sendMoney);
router.post('/request-withdraw',verifyToken, walletController.withdrawlRequest);
router.post('/upd-withdraw',verifyToken, walletController.updateWithdrawl);

router.post('/top-up',verifyToken, walletController.topUp);
router.post('/set-transaction-password',verifyToken, walletController.setTransactionPassword);


module.exports = router ;