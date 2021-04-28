const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: {
        hebrew: {
            type: String,
        },
        english: {
            type: String,
        },
        japanese: {
            type: String,
        }
    },
    type: {
        type: String,
        default: "series"
    },
    seasons: {
        type: Number,
        default: 1
    },
    addedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    episodesNumber: {
        type: Number
    },
    genre: {
        type: String
    },    
    summary: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: null
    },
    fansubs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Fansub' 
    }],
    episodes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Episode' 
    }]
});

module.exports = mongoose.model('Anime', animeSchema, 'Animes');