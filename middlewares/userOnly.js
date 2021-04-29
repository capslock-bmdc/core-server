const isUser = require('./roles/isUser');

module.exports = async function (req,res,next) {
    if(!isUser(req.user) && process.env.AUTH === 'enable') {
        return res.status(403).send('You are not a user');
    }
    next();
}