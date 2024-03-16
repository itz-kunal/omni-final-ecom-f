require('dotenv').config();
const jwt = require('jsonwebtoken');
const Shop = require('../Models/shop.model');
const secret = process.env.JWT_TOKEN || 'T7&3#r45%21E945$8#@90k3#9!1O890MI';
const expiresIn = process.env.JWT_EXPIRY || '30d';


/**
 * Generate signed JWT token
 * @param {object} user 
 * @returns {string} - Signed JWT token
 */
const generateToken = (user) => {
    try {
        if (!secret) throw new Error("JWT secret not found");

        // data to assign
        const data = {
            userId: user._id,
            name:user.name,
            email: user.email,
            role: user.role,
        }

        // generate token
        const token = jwt.sign(data, secret, { expiresIn });

        return token;
    } catch (error) {
        console.log("generate token failed:", error);
        throw new Error(error.message);
    }
};

/**
 * verify token
 * @param {object} req
 * @param {object} res
 * @param {Function}next 
 * @returns {object} - Signed JWT token
 */
function verifyToken(req, res, next) {
    const token = req.cookies.jwt || req.headers['authorization'];

    console.log(token)
    if (!token) {
        return res.status(403).send('invalid user');
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token ! please login again');
        }
       
        if(decoded.role == 'seller'){
          
            const res = await Shop.findOne({owner:decoded.userId})

            req.shop = {
                shopId: res._id.toString()
            }
           
        }
        
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken,verifyToken }