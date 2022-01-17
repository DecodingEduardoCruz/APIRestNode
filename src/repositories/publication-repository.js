'use strict' 

const mongoose = require('mongoose');
const Publication = mongoose.model('Publication');

exports.get = () => {
    return Publication.find();
},

exports.getById = (id) => {
    return Publication.findById(id);
}

exports.create = (data) => {
    var publication = new Publication(data);
    return publication.save();
}

exports.update = (id, data) => {
    return Publication.findByIdAndUpdate(id, {
        $set: {
            imageUrl: data.imageUrl,
            description: data.description,
            tags: data.tags
        }        
    });
}

exports.delete = (id) => {
   return Publication.findOneAndRemove(id);
}