const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const Khoa = new mongoose.Schema({
    maKhoa: {
        type: String,
        required: true,
        unique: true,
    },
    tenKhoa: {
        type: String, 
        required: true,
        unique: true,
    },
    soCBGD: {
        type: Number,
        min: 1,
    }
}, {
  timestamps: true,
});

Khoa.plugin(toJSON);
Khoa.plugin(paginate);

module.exports = mongoose.model('Khoa', Khoa);