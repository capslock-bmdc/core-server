const express = require('express');
const router = express.Router();
const User = require('../models/User');
const App = require('../models/App');
const jwt = require('jsonwebtoken');
const adminOnly = require('../middlewares/adminOnly');
const userOnly = require('../middlewares/userOnly');

router.get('/', async (req, res) => {
    const apps = await App.find();
    return res.json(apps);
});

router.get('/:name', async (req, res) => {
    const app = await App.findOne({name: req.params.name});
    return res.json(app);
});

router.post('/data', async (req, res) => {
    const updatedApp = await App.findOne({name: req.body.app});
    if(!updatedApp) {
        return res.status(400).json({status:"error", message: "App not found"});
    }
    updatedApp.data = req.body.data;

    const app = await App.findByIdAndUpdate({_id: updatedApp._id}, updatedApp, {new: true});
    return res.status(200).json({status:"ok", message: app});
});

router.post('/', userOnly, async (req, res) => {
    const nameExist = await App.findOne({name: req.body.name});

    if(nameExist) {
        return res.status(400).json({status:"error", message: 'App name already exist'});
    }

    const app = new App({
        name: req.body.name,
    });

    try {
        const savedApp = await app.save();
        return res.status(200).json(savedApp);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.get('/:id', userOnly, async (req, res) => {
    try {
        const app = await App.findById(req.params.id);
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.put('/:id', userOnly, async (req, res) => {
    const updatedApp = {
        name: req.body.name,
        admins: req.body.admins,
    };

    try {
        const app = await App.findByIdAndUpdate({_id: req.params.id}, updatedApp, {new: true});
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

router.delete('/:id', userOnly, async (req, res) => {
    try {
        const app = await App.findByIdAndDelete({_id: req.params.id});
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).json({status:"error", message: err});
    }
});

module.exports = router;