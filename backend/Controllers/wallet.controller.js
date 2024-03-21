const sendMail = require('../Functions/sendMail');
const Transaction = require('../Models/transactions.model');
const User = require('../Models/user.model');
const Withdrawl = require('../Models/withdrawl.model');
const { hashPassword, checkPassword } = require('../Utils/passwordHass');
const { default: mongoose } = require('mongoose');
const withdrawlRequest = async (req, res) => {
    try {
        const {userId} = req.user;
        const {upi, amount, transactionPassword} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(402).send({msg:'user not found ! may be server issue try again.'})
        }

        const isPassRight = await checkPassword(transactionPassword, user.transactionPassword)
        if(!isPassRight){
            return res.status(402).send({msg:'wrong transaction password !'})
        }

        if(user.balance < amount){
            return res.status(401).send({msg:'insufficient fund '})
        }

        user.withdrawls.push({upi, amount});
        const lastWithdrawl = user.withdrawls[user.withdrawls.length - 1];

        const withdrawl = new Withdrawl({
            user:userId,
            withdrawlId:lastWithdrawl._id,
            upi,
            amount
        }) 
        await withdrawl.save();
        user.balance -= amount ;
        await user.save();
        return res.send({msg:'withdrawl request submitted successfully !', withdrawls:user.withdrawls});

    } catch (err) {
        console.error('error in sending withdrawl request at wallet.controller ', err);
        return res.status(500).send('something went wrong ! try again.');
    }
}

//admin action
const allWithdrawl = async (req,res)=>{
    try{
        const allWithdrawl = await Withdrawl.find({});
        return res.send(allWithdrawl);
    }catch(err){
        console.log('all withdrawl', err)
        return res.status(500).send('something gonna wrong')
    }

}
const updateWithdrawl = async (req,res)=>{
    try{
        const {userId, withdrawlId, status} = req.body;
        const [pendWithdrawl, user] = await Promise.all([Withdrawl.findById(withdrawlId), User.findById(userId)])
        
        // const user = await User.findById(userId);
        if(!user){
            return res.status(401).send({msg:'user not found, try again', status:false});
        }
        const withdrawl = user.withdrawls.find(elem => elem._id.equals(pendWithdrawl.withdrawlId))
        if(!withdrawl){
            return res.status(400).send({msg:'withdrawl not found, try again', status:false});
        }

        if(status == 'approve'){
            withdrawl.status = 'approved' ;
            // sendMail(user.email, 'Withdrawl at omitrek', `your withdrawl of ₹${withdrawl.amount} has been accepted it has been transfered to your UPI.`) ;
        }else{
            withdrawl.status = 'declined';
            user.balance += withdrawl.amount ;
            sendMail(user.email,'Withdrawl at omitrek', `you withdrawl of ₹${withdrawl.amount} has been declined, if you have any doubt contact us on our helpline number`)
        }

        await pendWithdrawl.deleteOne();
        await user.save()
        return res.send({msg:'withdrawl approved successfully', status:true})
    }catch(err){
        console.error('upd withdrawl', err)
        return res.status(500).send({msg:'something went wrong! try again', status:false})
    }   
}

const topUp = async(req,res) => {
    try{
        const {userId} = req.user;
        const {upi,amount} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(402).send('user not found, try again')
        }

        const transaction = new Transaction({
            upi,amount,
            user:user._id,
            paidFor:'topUp'
        })
        await transaction.save();
        return res.send('topup request submitted successfully');

    }catch (err) {
        console.error('error in topUp request at wallet.controller ', err);
        return res.status(500).send('something went wrong ! try again.');
    }
}

//admin action from transactions
const approveTopUp = async(userId,amount) => {
    try{
        console.log('h;o')
        const user = await User.findById(userId);

        if(!user){
            return ({msg:'user not found, try again', status:false});
        }

        // sendMail(user.email, 'Omitrek topup', `dear customer, you topup of ${amount} has been approved, Enjoy the benifit of its`)
        user.omniCoin += amount;
        await user.save()
        return ({msg:'topup successfully', status:true})
    }catch(err){
        console.log(err)
        return ({msg:'something went wrong! try again', status:false})
    }
}

const sendMoney = async(req,res) =>{
    try{
        const {userId} = req.user;
        const {receiverId, receiverPhone, amount, password} = req.body;
        const user = await User.findById(userId);


        if (isNaN(amount) || amount <= 0) {
            return res.status(400).send('Invalid amount ! try again');
        }
        if(amount > user.omniCoin){
            return res.status(400).send(`insufficient balance you just have ${user.balance} which you can send`)
        }

        const isPassRight = await checkPassword(password, user.transactionPassword)
        if(!isPassRight){
            return res.status(401).send('wrong password ! try again')
        }

        let receiver;
        if (receiverId) {
            receiver = await User.findById(receiverId);
        } else if (receiverPhone) {
            receiver = await User.findOne({ phone: receiverPhone });
        }
        if(!receiver){
            return res.status(401).send('invaild receiver details try again')
        }

        // Update balances in a transaction session insures that all updates goes right if any not all not updates
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            receiver.omniCoin += (parseFloat(amount)*0.98);
            receiver.receivedCoins = {
                sender:user._id,
                senderName:user.name,
                coins:amount
            }
            user.omniCoin -= amount;
            user.sentCoins = {
                receiver:user._id,
                receiverName:user.name,
                coins:amount
            }

            await receiver.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.send('Amount transferred successfully');

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error; 
        }

    }catch(err){
        console.error('error in sending money at wallet controller', err)
        return res.status(500).send('something went wrong ! try again.')
    }
}

const setTransactionPassword = async(req,res)=>{
    try{
        const {userId} = req.user;
        const {transactionPassword} = req.body;

        const user = await User.findById(userId);
        if(!user || !transactionPassword){
            return res.send({msg:'missing parameters'})
        }

        const hashedTransactionPassword = await hashPassword(transactionPassword)
        user.transactionPassword = hashedTransactionPassword;
        await user.save()

        return res.send({msg:'transaction password set successfully'})
    }catch(err){
        console.error('error in setting transaction password wallet.controller', err);
        return res.status(500).send({msg:'something went wrong try again !'})
    }
}

const getWithdrawls = async(req,res)=>{
    try{
        const {userId} = req.user;
        const user = await User.findById(userId);
        if(!user){
           return res.status(404).send({msg:'user not found register first !'})
        }

        return res.send({msg:'successfull', withdrawls:user.withdrawls});
    }catch(err){
        console.error('error in getting withdrawls at wallet controller', err);
        return res.status(500).send({msg:'something went wrong try again'})
    }
}
const walletController = {
    withdrawlRequest,
    updateWithdrawl,
    topUp,
    approveTopUp,
    sendMoney,
    setTransactionPassword,
    getWithdrawls,
    allWithdrawl
}
module.exports = walletController ;
