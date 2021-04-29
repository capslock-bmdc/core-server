const express = require('express');
const router = express.Router();
const User = require('../models/User');
const App = require('../models/App');
const jwt = require('jsonwebtoken');

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

router.get('/:id', async (req, res) => {
    try {
        const app = await App.findById(req.params.id);
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    const updatedApp = {
        name: req.body.name,
        admins: req.body.admins,
    };

    try {
        const app = await App.findByIdAndUpdate({_id: req.params.id}, updatedApp, {new: true});
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const app = await App.findByIdAndDelete({_id: req.params.id});
        return res.status(200).json(app);
    } catch(err) {
        return res.status(400).send(err);
    }
});

module.exports = router;