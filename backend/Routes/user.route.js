const { Router } = require("express");
const userController = require("../Controllers/user.controller");
const { verifyToken } = require("../Utils/jwt.utils");

const router = Router();

router.post('/check-user',verifyToken, async(req,res)=>{
    return res.send('valid');
})
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/user-info', verifyToken, userController.getUser);
router.get('/transactions', verifyToken, userController.getTransactions)
router.post('/update-profile', verifyToken, userController.updatedProfile);
router.post('/update-password', verifyToken, userController.updatePassword)


router.post('logout', userController.logout);
module.exports = router;