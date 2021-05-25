const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    admins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    data: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('App', appSchema, 'Apps');