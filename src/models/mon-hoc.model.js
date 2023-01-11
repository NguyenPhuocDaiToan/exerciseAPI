const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const MonHoc = new mongoose.Schema(
  {
    maMonHoc: {
      type: String,
      required: true,
      unique: true,
    },
    tenMonHoc: {
      type: String,
      required: true,
    },
    soTiet: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

MonHoc.plugin(toJSON);
MonHoc.plugin(paginate);

module.exports = mongoose.model('MonHoc', MonHoc);
