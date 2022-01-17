'use strict' 

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.get = () => {
    return Customer.find();
},

exports.getById = (id) => {
    return Customer.findById(id);
}

exports.create = (data) => {
    var customer = new Customer(data);
    return customer.save();
}

exports.update = (id, data) => {
    return Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            phone: data.phone
        }        
    });
}

exports.delete = (id) => {
   return Customer.findOneAndRemove(id);
}

exports.authenticate = async(data) => {
    const res = await Custumer.findOne({
        phone: data.phone,
        password: data.password
    });
}


