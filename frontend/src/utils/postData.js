const { default: axios } = require("axios")
const { APPROVE_TRANSACTIONS, BUY_COUPON } = require("./apiroutes")

export const changeCouponStat = async (transactionId, status) => {
    try{
    const res = await axios.post(APPROVE_TRANSACTIONS,{transactionId, status},{withCredentials:true})

    console.log('logged at post data in change coupon stat', res)
    return res.data;
    }catch(err){
        console.error('error at approving transactions at postData', err)
        return false;
    }
}

export const buyCoupon = async (carId)=>{
    try{
        const res = await axios.post(BUY_COUPON, {carId}, {withCredentials:true});
        return await res.data
    }catch(err){
        console.error('error in buying coupon at postData', err);
        return false;
    }
}