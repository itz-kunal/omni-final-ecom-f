const {
    default: axios
} = require("axios")
const {
    GET_USER, GET_TRANSACTIONS
} = require("./apiroutes")

export const fetchUser = async ({setUser}) => {
    try {
        const res = await axios.get(GET_USER, {
            withCredentials: true
        });
        if (!res) {
            return false;
        }
        return res.data;
    } catch (err) {
        console.error('error in getting user at fetchData', err);
        return false
    }
}

export const fetchTransactions = async () => {
    try{
        const res = await axios.get(GET_TRANSACTIONS, {withCredentials:true})

        return res.data;
    }catch (err) {
        console.error('error in getting transactions at fetchData', err);
        return false
    }
}