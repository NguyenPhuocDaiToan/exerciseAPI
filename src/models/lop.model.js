const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Lop = new mongoose.Schema(
  {
    maLop: {
      type: String,
      required: true,
      unique: true,
    },
    tenLop: {
      type: String,
      required: true,
    },
    khoa: { type: String, ref: 'Khoa' },
  },
  {
    timestamps: true,
  }
);

Lop.plugin(toJSON);
Lop.plugin(paginate);

module.exports = mongoose.model('Lop', Lop);
