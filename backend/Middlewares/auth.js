
// Middleware to check if the User is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    } else {
        return res.status(402).send('invalid request ! do your work in limit.');
    }
};

module.exports = isAuthenticated;