const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const SinhVien = new mongoose.Schema(
  {
    maSinhVien: {
      type: String,
      required: true,
      unique: true,
    },
    hoTen: {
      type: String,
      required: true,
    },
    nu: String,
    ngaySinh: Date,
    hocBong: Number,
    tinh: String,
    lop: { type: String, ref: 'Lop' },
  },
  {
    timestamps: true,
  }
);

SinhVien.plugin(toJSON);
SinhVien.plugin(paginate);

module.exports = mongoose.model('SinhVien', SinhVien);
