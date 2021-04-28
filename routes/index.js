const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json('Welcome to CAPSLOCK API');
});

router.get('/home', (req, res) => {
    res.redirect('/');
});

module.exports = router;