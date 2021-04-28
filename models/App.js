const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    admins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    customConfig: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('App', appSchema, 'Apps');