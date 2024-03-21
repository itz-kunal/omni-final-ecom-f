
const API_URI = process.env.API_URI || 'https://omni-final-ecom-backend.onrender.com' ; 

const USER_ENDPOINTS = `${API_URI}/user`;
const COUPON_ENDPOINTS = `${API_URI}/coupon`;
const ADMIN_ENDPOINTS = `${API_URI}/admin`;
const SHOP_ENDPOINTS = `${API_URI}/shop`;
const ORDER_ENDPOINTS = `${API_URI}/order`;
const PRODUCT_ENDPOINTS = `${API_URI}/product`;
const WALLET_ENDPOINTS = `${API_URI}/wallet`;

//user endpoints
export const CHECK_USER = `${USER_ENDPOINTS}/check-user`
export const LOGIN =  `${USER_ENDPOINTS}/login`;
export const SIGN_UP = `${USER_ENDPOINTS}/register`;

export const GET_USER = `${USER_ENDPOINTS}/user-info`;
export const GET_USER_TRANSACTIONS = `${USER_ENDPOINTS}/transactions`;
export const UPDATE_PROFILE = `${USER_ENDPOINTS}/update-profile`;
export const UPDATE_PASSWORD = `${USER_ENDPOINTS}/update-password`;
export const LOGOUT = `${USER_ENDPOINTS}/log-out`

// Product endpoints
export const PENDING_PRODUCTS = `${PRODUCT_ENDPOINTS}/pending-products`
export const GET_PRODUCTS = `${PRODUCT_ENDPOINTS}/get-products`
export const SEARCH_PRODUCTS = `${PRODUCT_ENDPOINTS}/search-products`;
export const SEARCH_BY_CATEGORY = `${PRODUCT_ENDPOINTS}/search-by-category`;
export const GET_PRODUCT_DETAILS = `${PRODUCT_ENDPOINTS}/:productId`;
export const ADD_NEW_PRODUCT = `${PRODUCT_ENDPOINTS}/add-new-product`;
export const ADD_EXISTING_PRODUCT = `${PRODUCT_ENDPOINTS}/add-existing-product`;
export const EDIT_PRODUCT = `${PRODUCT_ENDPOINTS}/edit-product`;
export const APPROVE_PRODUCT = `${PRODUCT_ENDPOINTS}/approve-product`;
export const GET_CATEGORIES = `${PRODUCT_ENDPOINTS}/get-categories`

// Wallet endpoints
export const ALL_WITHDRAWL = `${WALLET_ENDPOINTS}/all-withdrawl`
export const WITHDRAWLS = `${WALLET_ENDPOINTS}/withdrawls`;
export const SEND_MONEY = `${WALLET_ENDPOINTS}/send-money`;
export const REQUEST_WITHDRAW = `${WALLET_ENDPOINTS}/request-withdraw`;
export const UPDATE_WITHDRAW = `${WALLET_ENDPOINTS}/upd-withdraw`;
export const TOP_UP = `${WALLET_ENDPOINTS}/top-up`;
export const SET_TRANSACTION_PASSWORD = `${WALLET_ENDPOINTS}/set-transaction-password`;



//coupon endpoints
export const BUY_COUPON = `${COUPON_ENDPOINTS}/buy-coupon`;
export const OPEN_SCRATCH = `${COUPON_ENDPOINTS}/open-scratch`;
export const GET_COUPONS = `${COUPON_ENDPOINTS}/get-coupons`;
export const ACTIVE_COUPONS = `${COUPON_ENDPOINTS}/active-coupons`
export const ALL_COUPONS = `${COUPON_ENDPOINTS}/all-coupons`
export const SENT_60_COUPON = `${COUPON_ENDPOINTS}/send-60-coupon`;

// Order endpoints
export const SHOP_ORDERS = `${ORDER_ENDPOINTS}/shop-orders`;
export const GET_USER_ORDERS = `${ORDER_ENDPOINTS}/orders/:limit`;
export const BUY_PRODUCT = `${ORDER_ENDPOINTS}/buy-product`;
export const ORDER_DETAILS = `${ORDER_ENDPOINTS}/order-details`;
export const UPDATE_ORDER = `${ORDER_ENDPOINTS}/update-order`;


// Shop endpoints
export const SEARCH_SHOP = `${SHOP_ENDPOINTS}/search-shop`
export const GET_SHOP = `${SHOP_ENDPOINTS}/v/:id`;
export const SELLER_SHOP_DATA = `${SHOP_ENDPOINTS}/seller-shop`;

export const SHOP_PRODUCTS = `${SHOP_ENDPOINTS}/shop-products`;
export const NEARBY_SHOPS = `${SHOP_ENDPOINTS}/nearby-shops`;
export const GET_SHOPS = `${SHOP_ENDPOINTS}/get-shops`;

export const SEARCH_IN_SHOP = `${SHOP_ENDPOINTS}/search-in-shop`;
export const CHECK_NAME = `${SHOP_ENDPOINTS}/check-name`;
export const REGISTER_SHOP = `${SHOP_ENDPOINTS}/register-shop`;
export const EDIT_SHOP = `${SHOP_ENDPOINTS}/edit-shop`;


//admin endpoints
export const ADD_CATEGORY = `${ADMIN_ENDPOINTS}/add-category`
export const DELETE_CATEGORY = `${ADMIN_ENDPOINTS}/delete-category`
export const EDIT_CATEGORY = `${ADMIN_ENDPOINTS}/edit-category`
export const GET_TRANSACTIONS = `${ADMIN_ENDPOINTS}/all-transactions`;
export const APPROVE_TRANSACTIONS = `${ADMIN_ENDPOINTS}/approve-payment`;
export const PENDING_ORDERS = `${ADMIN_ENDPOINTS}/pending-orders`;
export const ALL_ORDERS = `${ADMIN_ENDPOINTS}/all-orders`
export const GENERAL_PRODUCTS = `${ADMIN_ENDPOINTS}/general-products`
export const FASHION_PRODUCTS = `${ADMIN_ENDPOINTS}/fashion-products`
export const GET_ALL_USERS = `${ADMIN_ENDPOINTS}/all-users`
export const SEARCH_USERS = `${ADMIN_ENDPOINTS}/search-users`
export const DELETE_USER = `${ADMIN_ENDPOINTS}/delete-user`;

export const ADD_NOTIFICATION = 'soon';
export const VERIFY_OTP = 'soon';
export const EDIT_NOTIFICATION = 'soon'
export const DELETE_NOTIFICATION = 'soon'
export const GET_ALL_SALES = 'soon'
