'use strict' 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },   
    publishAt: {
        type: Date,
        default: Date.now
    },
    tags: [
        {
            type: String,
            required: false,
        }
    ]
});

module.exports = mongoose.model('Publication', schema);