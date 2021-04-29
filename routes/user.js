const express = require('express');
const router = express.Router();
const App = require('../models/App');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const adminOnly = require('../middlewares/adminOnly');
const userOnly = require('../middlewares/userOnly');

router.get('/', async (req, res) => {
    const users = await User.find();
    return res.json(users);
});

router.post('/', adminOnly, async (req, res) => {
    const tzExist = await User.findOne({tz: req.body.tz});

    if(tzExist) {
        return res.status(400).json({status:"error", message: 'TZ already exist'});
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tz: req.body.tz,
        phone: req.body.phone
    });

    try {
        const savedUser = await user.save();
        //Create and assign a jwt token
        const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET);
        return res.status(200).json({user: savedUser});
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.put('/:id', adminOnly, async (req, res) => {
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tz: req.body.tz,
        phone: req.body.phone
    };

    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id}, updatedUser, {new: true});
        return res.status(200).json(user);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.delete('/:id', adminOnly, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id});
        return res.status(200).json(user);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

module.exports = router;