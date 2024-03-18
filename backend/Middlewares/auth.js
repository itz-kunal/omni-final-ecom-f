
// Middleware to check if the User is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    } else {
        return res.status(402).send('invalid request ! do your work in limit.');
    }
};

function checkAdmin(req,res,next){
    if(req.user.role != 'admin'){
        return res.status(402).send({msg:'admin permission required for this action'})
    }
    return next()
}

module.exports = {checkAdmin};