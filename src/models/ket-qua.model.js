const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const KetQua = new mongoose.Schema(
  {
    maSinhVien: { type: String, ref: 'SinhVien', required: true },
    maMonHoc: { type: String, ref: 'MonHoc', required: true },
    diemThi: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

KetQua.plugin(toJSON);
KetQua.plugin(paginate);

module.exports = mongoose.model('KetQua', KetQua);
