const sendMail = require('../Functions/sendMail');
const Banner = require('../Models/banner.model.js')
const walletController = require("./wallet.controller");
const orderController = require("./order.controller");

const Transaction = require("../Models/transactions.model");
const User = require("../Models/user.model");
const {
    PendingOrder,
    Order
} = require("../Models/order.model");
const {
    FashionProduct,
    GeneralProduct
} = require('../Models/product.model.js');
const Category = require('../Models/categories.model.js');


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.send({
            msg: 'fetched successfully',
            users: allUsers
        })
    } catch (err) {
        console.error('error at getting all users in admin controller', err);
        return res.status(500).send({
            msg: 'something went wrong ! please try again.'
        })
    }

}

const searchUser = async (req, res) => {
    try {
        const {
            userId,
            userName
        } = req.body;

        let data;
        if (userId) {
            data = await User.find({
                _id: userId
            })
        } else if (userName) {
            data = await User.find({
                name: userName
            })
        } else {
            return res.status(401).send({
                msg: 'argument missing !'
            })
        }

        return res.send({
            msg: 'successfull',
            users: data
        })
    } catch (err) {
        console.error('admin error in searching user', err)
        return res.status(500).send({
            msg: 'Something went wrong !'
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const {
            userId
        } = req.body;
    
        User.findByIdAndDelete(userId , (err) => {
            if (err) {
                console.error('admin error in deleting user', err.message);
                return res.status(500).send({msg:'something went wrong'});

            } else {
                return res.send({msg:'user deleted successfully'});
            }
        })

    } catch (err) {
        console.error('admin error in deleting user', err.message);
        return res.status(500).send({msg:'something went wrong'});
    }
}

//admin actions on order
const getPendingOrders = async (req, res) => {
    try {
        const orders = await PendingOrder.find({});
        return res.send(orders)
    } catch (err) {
        console.error('error at getting pending orders in admin controller', err);
        return res.status(500).send('something went wrong ! please try again.')
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.send(orders);
    } catch (err) {
        console.error('error at getting all orders in admin controller', err);
        return res.status(500).send('something went wrong ! please try again.')
    }
}

//actions on products pending products action is in product controller
const getFashionProducts = async (req, res) => {
    try {

        const products = await FashionProduct.find({});
        return res.send(products);
    } catch (err) {
        console.error('error at getting fashion products in admin controller', err);
        return res.status(500).send('something went wrong ! please try again.')
    }
}
const getGeneralProducts = async (req, res) => {
    try {

        const products = await GeneralProduct.find({});
        return res.send(products);
    } catch (err) {
        console.error('error at getting general products in admin controller', err);
        return res.status(500).send('something went wrong ! please try again.')
    }
}

//transaction actions 
const getAllTransactions = async (req, res) => {
    try {
        const {
            status
        } = req.query;
       
        let allTransactions = [];
        if (status == 'all') {
            allTransactions = await Transaction.find({});
        } else {
            allTransactions = await Transaction.find({
                status
            });
        }

        return res.send(allTransactions);
    } catch (err) {
        console.error('error in getting all transactions at admin controller', err);
        return res.status(500).send('something went wrong ! please try again')
    }
}
const approveTransaction = async (req, res) => {
    const {
        transactionId,
        status
    } = req.body;

    try {
        // if (!req.session.isAdmin) {
        //     return res.status(401).send('you are not allowed to perform this action.')
        // }
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(401).send('transaction not fount, try again');
        }
        if (transaction.status == 'approved') {
            return res.status(402).send('trasaction has already approved')
        }

        const userId = transaction.user;


        let updTransactionDoneFor;
        if (transaction.paidFor == 'topUp' && status == 'approve') {
            updTransactionDoneFor = await walletController.approveTopUp(userId, transaction.amount)

        } else if (transaction.paidFor == 'product') {
            updTransactionDoneFor = await orderController.updOrderPayment(transaction.paidForDetail, status)

        }

        if (!updTransactionDoneFor) {
            console.error('error in updating transaction status in', updTransactionDoneFor);
            return res.status(500).send('something went wrong ! try again');
        }

        if (status == 'decline') {
            await transaction.deleteOne();
            return res.send('transaction has been declined');
        }

        transaction.status = 'approved';
        await transaction.save();
        return res.send('transaction has been approved successfully !');

    } catch (error) {
        console.error('Error in approving payment in admin controller', error);
        return res.status(500).send('Internal Server Error ! try again');
    }
}

//category action
const addCategory = async (req, res) => {
    try {
        const {
            name,
            type,
            description,
            platformCharge
        } = req.body;
        const ifCategory = await Category.findOne({
            name
        });
        if (ifCategory) {
            return res.status(400).send('category already exists')
        }

        const category = new Category({
            name,
            type,
            platformCharge,
            description
        })
        await category.save();

        return res.send('category added successfully')
    } catch (err) {
        console.log('admin err', err)
        res.status(500).send('something went wrong try again !')
    }
}

//actions on banner
const allBanner = async (req, res) => {
    try {
        const banners = await Banner.find({});

        return res.send({
            msg: 'fetched successfully',
            banners
        });

    } catch (err) {
        console.error('all banner err in admin.controller', err);
        return res.status(500).send({
            msg: 'internal server error ! please try later'
        })
    }
}
const addBanner = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body;
        const banner = new Banner({
            name,
            description,
            image: req.files
        })

        await banner.save();

        return res.send({
            msg: 'Banner added successfully',
            banner
        });
    } catch (err) {
        console.error('add banner err in admin.controller', err);
        return res.status(500).send({
            msg: 'internal server error ! please try later'
        })
    }
}

const adminController = {
    getAllUsers,
    getAllTransactions,
    getAllOrders,
    getFashionProducts,
    getGeneralProducts,
    getPendingOrders,
    approveTransaction,
    addCategory,
    allBanner,
    addBanner,
    searchUser,
    deleteUser
}

module.exports = adminController;