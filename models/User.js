const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    roles: {
        type: [String],
        default: ['user']
    },
    permissions: {
        type: [String],
        default: null
    },
    banned: {
        type: Date,
        default: null
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