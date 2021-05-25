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
    shiur: {
        type: Number,
        default: 1
    },
    degreeYear: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
        default: 18
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    userType: {
        type: String,
        default: 'student'
    },
    profileImage: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    Banjax: {
        type: String,
        default: null
    },
    Bandom: {
        type: String,
        default: null
    },
    Bansite: {
        type: String,
        default: null
    },
    Bandio: {
        type: String,
        default: null
    },
    NoName: {
        type: String,
        default: null
    },
    Hamachteret: {
        type: String,
        default: null
    },
    Banja: {
        type: String,
        default: null
    },
    Banpy: {
        type: String,
        default: null
    },
});

module.exports = mongoose.model('User', userSchema, 'Users');