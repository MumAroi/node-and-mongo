const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    idGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10
    },
}));

function validateCustomer(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(9).max(10).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(genre, schema);
}

exports.Customer = Customer
exports.validate = validateCustomer