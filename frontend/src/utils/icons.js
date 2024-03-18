import {FaStore, FaUserCog , FaShoppingCart, FaChartLine, FaUsers, FaHandHoldingUsd, FaMoneyBill, FaFileInvoiceDollar, FaBagShopping, FaDoorOpen, FaPaperPlane, FaCheck, FaMinus, FaBars } from 'react-icons/fa';

// import {  } from 'react-icons/fa';


const Ham = ({className='fa'}) => <FaBars className={className}/>
const Coupons = ({className='fa'})=><FaMoneyBill className={className}/>;
const Users = ({className='fa'})=> <FaUsers className={className}/>;
const Dashboard = ({className='fa'}) => <FaChartLine className={className}/>;
const Setting = 'setting icon';
const Profile = ({className='fa'}) => <FaUserCog className={className}/>
const Withdraw = ({className = 'fa'}) => <FaHandHoldingUsd className={className}/> ;
const Send = ({className='fa'}) => <FaPaperPlane className={className}/>;
const Search = 'search icon';
const Order = ({className='fa'})=><FaShoppingCart className={className}/>;
// const Order = 'heu'
const Logout = ({className='fa'}) => <FaDoorOpen className={className}/>;
const Check = ({className='fa'})=><FaCheck className={className}/>;
const Minus = ({className='fa'})=><FaMinus className={className}/>;
const Products = ({className='fa'})=><FaStore className={className}/>;

const Icons = {
    Coupons,Dashboard,Search,Setting,Send,Withdraw,Users,Logout,Profile,Order,Check,Minus,Ham,Products
}

export default Icons;