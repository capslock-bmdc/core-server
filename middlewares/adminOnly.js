const isAdmin = require('./roles/isAdmin');

module.exports = async function (req,res,next) {
    if(!isAdmin(req.user) && process.env.AUTH === 'enable') {
        return res.status(403).send('You are not an admin');
    }
    next();
}