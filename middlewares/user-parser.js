const jwt = require('jsonwebtoken');
const User = require('../models/User');
const App = require('../models/App');

module.exports = async function (req,res,next) {
    const token = req.headers.authorization?.split(" ")[1];
    const guestUser = {
        username: "אורח",
        verified: false,
        role: 'guest'
    };

    if(!token) {
        req.user = guestUser;
        return next();
        //return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        try {
            let user = await User.findById({_id: verified.userId});
            req.user = user;

            let app = await App.findById({_id: verified.appId});
            req.app = app;

            req.user.verified = true;
        } catch(err) {
            console.log(err);
            req.user = guestUser;
        }
        next();
    } catch(err) {
        res.status(401).json({status:"error", message: 'Invalid Token'});
    }
}