const express = require('express');
const router = express.Router();
const User = require('../models/User');
const App = require('../models/App');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isAdmin = require('./auth/isAdmin');
const adminOnly = require('./auth/adminOnly');
const ownerOnly = require('./auth/ownerOnly');

router.get('/', async (req, res) => {
    const apps = await Apps.find();
    return res.json(apps);
});

router.post('/', async (req, res) => {
    const nameExist = await App.findOne({name: req.body.name});

    if(nameExist) {
        return res.status(400).send('App name already exist');
    }

    const app = new App({
        name: req.body.name,
    });

    try {
        const savedApp = await app.save();
        return res.status(200).json(savedApp);
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.get('/:appId', async (req, res) => {
    try {
        const app = await App.findById(req.params.appId);
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).send(err);
    }
});


module.exports = router;