const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    passportNumber: { type: String, required: true },
    status: {
        type: String,
        enum: ['accepted', 'pending', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Client', clientSchema);