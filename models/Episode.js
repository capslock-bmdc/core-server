const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    },
    season: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        require: true,
    },
    number: {
        type: Number,
        require: true,
    },
    link: {
        type: String,
        require: true
    },
    post: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    addedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addedByFansub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fansub'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: null
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'EpisodeComment' 
    }]
});

module.exports = mongoose.model('Episode', episodeSchema, 'Episodes');