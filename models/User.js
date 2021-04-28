const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    tz: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    userType: {
        type: String,
        default: 'guest'
    },
    profileImage: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema, 'Users');