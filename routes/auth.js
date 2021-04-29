const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const App = require('../models/App');
const User = require('../models/User');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

router.post('/token', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(400).send('User is not exist');
        }

        const app = await App.findById({_id: req.body.appId});

        if(!app) {
            return res.status(400).send('App is not exist');
        }

        const token = jwt.sign({userId: user._id, appId: app._id}, process.env.TOKEN_SECRET);
    
        let tokenMail = {
            from: `"Capslock BMDC - NoReply" <${process.env.MAIL_USER}@gmail.com>`,
            to: user.email,
            subject: `קוד אימות לאפליקציה ${app.name}`,
            text: `שלום ${user.firstName} ${user.lastName},
קוד האימות שלך הוא:
${token}
`
        };

        transporter.sendMail(tokenMail, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('email was sended')
            }
        });

        return res.status(200).json({status:"ok"});
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.get('/verification/:token', async (req, res) => {
    let verified;

    try {
        verified = jwt.verify(req.params.token, process.env.TOKEN_SECRET);
        if(!verified) {
            return res.status(400).send('Invalid token');
        }
    } catch(err) {
        return res.status(400).send(err.message);
    }

    try {
        const user = await User.findById({_id: verified.userId});

        if(!user) {
            return res.status(400).send('Invalid token');
        }

        const app = await App.findById({_id: verified.appId});

        if(!app) {
            return res.status(400).send('Invalid token');
        }

        return res.status(200).json({status:"ok"});
    } catch(err) {
        return res.status(400).send(err);
    }
});

module.exports = router;