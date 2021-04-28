const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    },
    season: {
        type: Number,
        default: 1
    },
    fansub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fansub'
    },
    status: {
        type: String,
        default: 'פעיל'
    },
    addedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    episodes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Episode' 
    }]
});

module.exports = mongoose.model('Project', projectSchema, 'Projects');