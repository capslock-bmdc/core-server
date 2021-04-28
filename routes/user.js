const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const isAdmin = require('./auth/isAdmin');
const adminOnly = require('./auth/adminOnly');
const ownerOnly = require('./auth/ownerOnly');

router.get('/', async (req, res) => {
    const users = await User.find();
    return res.json(users);
});


router.post('/', async (req, res) => {
    const tzExist = await User.findOne({tz: req.body.tz});

    if(tzExist) {
        return res.status(400).send('TZ already exist');
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        tz: req.body.tz,
        phone: req.body.phone
    });

    try {
        const savedUser = await user.save();
        //Create and assign a jwt token
        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
        return res.status(200).json({token, user: savedUser});
    } catch(err) {
        return res.status(400).send(err);
    }
});


module.exports = router;