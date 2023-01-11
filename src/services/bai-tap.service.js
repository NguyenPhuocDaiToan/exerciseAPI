const { Khoa, Lop, SinhVien, MonHoc, KetQua } = require('../models/index');

module.exports = {
  cau1: async () => {
    return Lop.find();
  },

  cau2: async () => {
    return await SinhVien.find({}, ['maSinhVien', 'hoTen', 'hocBong']);
  },

  cau3: async () => {
    return await SinhVien.find({ hocBong: { $gt: 0 } }, ['maSinhVien', 'nu', 'hocBong']);
  },

  cau4: async () => {
    return await SinhVien.find({ nu: 'YES' });
  },

  cau5: async () => {
    return await SinhVien.find({ hoTen: /^Trần.*/ });
  },

  cau6: async () => {
    return await SinhVien.find({ nu: 'YES', hocBong: { $gt: 0 } });
  },

  cau7: async () => {
    return await SinhVien.find({ $or: [{ nu: 'YES' }, { hocBong: { $gt: 0 } }] });
  },

  cau8: async () => {
    return await SinhVien.find({ ngaySinh: { $gte: '1978-01-01', $lte: '1985-12-31' } });
  },

  cau9: async () => {
    return await SinhVien.find().sort({ maSinhVien: 1 });
  },

  cau10: async () => {
    return await SinhVien.find().sort({ hocBong: -1 });
  },

  cau11: async () => {
    return await KetQua.aggregate([
      {
        $lookup: {
          // join KetQua and SinhVien
          from: SinhVien.collection.name,
          localField: 'maSinhVien',
          foreignField: 'maSinhVien',
          as: 'sinhVien',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$sinhVien', 0] }, '$$ROOT'] } },
      },
      {
        $project: { sinhVien: 0 },
      },
      {
        $lookup: {
          // join KetQua and MonHoc
          from: MonHoc.collection.name,
          localField: 'maMonHoc',
          foreignField: 'maMonHoc',
          as: 'monHoc',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$monHoc', 0] }, '$$ROOT'] } },
      },
      {
        $project: { monHoc: 0 },
      },
      {
        $match: { maMonHoc: 'CSDL', diemThi: { $gte: 8 } },
      },
      {
        $project: {
          maSV: 1,
          hoTen: 1,
          nu: 1,
          ngaySinh: 1,
          diemThi: 1,
        },
      },
    ]);
  },

  cau12: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          // join SinhVien and Lop
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $project: { lop: 0 },
      },
      {
        $match: { maKhoa: 'CNTT', hocBong: { $gt: 0 } },
      },
      {
        $project: {
          maSinhVien: 1,
          hoTen: 1,
          hocBong: 1,
          tenLop: 1,
        },
      },
    ]);
  },

  cau13: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $project: { lop: 0 },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $project: { khoa: 0 },
      },
      {
        $match: { maKhoa: 'CNTT', hocBong: { $gt: 0 } },
      },
      {
        $project: { maSinhVien: 1, hoTen: 1, hocBong: 1, tenLop: 1, tenKhoa: 1 },
      },
    ]);
  },

  cau14: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maLop: '$maLop',
            tenLop: '$tenLop',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          maLop: '$_id.maLop',
          tenLop: '$_id.tenLop',
          soLuongSinhVien: 1,
        },
      },
    ]);
  },

  cau15: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          soLuongSinhVien: 1,
        },
      },
    ]);
  },

  cau16: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $match: { nu: 'YES' },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          soLuongSinhVien: 1,
        },
      },
    ]);
  },

  cau17: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maLop: '$maLop',
            tenLop: '$tenLop',
          },
          tongHB: { $sum: '$hocBong' },
        },
      },
      {
        $project: {
          _id: 0,
          maLop: '$_id.maLop',
          tenLop: '$_id.tenLop',
          tongHB: 1,
        },
      },
    ]);
  },

  cau18: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          tongHB: { $sum: '$hocBong' },
        },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          tongHB: 1,
        },
      },
    ]);
  },

  cau19: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $match: { soLuongSinhVien: { $gt: 100 } },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          soLuongSinhVien: 1,
        },
      },
    ]);
  },

  cau20: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $match: { nu: 'YES' },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $match: { soLuongSinhVien: { $gt: 50 } },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          soLuongSinhVien: 1,
        },
      },
    ]);
  },

  cau21: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          tongHB: { $sum: '$hocBong' },
        },
      },
      {
        $match: { tongHB: { $gte: 1000000 } },
      },
      {
        $project: {
          _id: 0,
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          tongHB: 1,
        },
      },
    ]);
  },

  cau22: async () => {
    return await SinhVien.find().sort({ hocBong: -1 }).limit(1);
  },

  cau23: async () => {
    return await SinhVien.aggregate([
      {
        $lookup: {
          from: KetQua.collection.name,
          localField: 'maSinhVien',
          foreignField: 'maSinhVien',
          as: 'ketqua',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$ketqua', 0] }, '$$ROOT'] } },
      },
      {
        $match: {
          maMonHoc: 'CSDL',
        },
      },
      {
        $sort: { diemThi: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          maSinhVien: 1,
          hoTen: 1,
          diemThi: 1,
        },
      },
    ]);
  },

  cau24: async () => {
    // Cách 1: 
    // let sinhViens = await SinhVien.aggregate([
    //   {
    //     $lookup: {
    //       from: KetQua.collection.name,
    //       localField: 'maSinhVien',
    //       foreignField: 'maSinhVien',
    //       as: 'ketqua',
    //     },
    //   },
    // ]);
    // // Lọc những sinh viên trong mảng kết quả không có môn CSDL
    // sinhViens = sinhViens.filter((s) => s.ketqua.findIndex((k) => k.maMonHoc === 'CSDL') === -1);
    // return sinhViens;

    // Cách 2: 
    let maSinhViens = [];
    (await KetQua.find({ maMonHoc: 'CSDL' }, {maSinhVien: 1})).forEach(s => maSinhViens.push(s.maSinhVien));

    let sinhViens = await SinhVien.find({maSinhVien: {$nin: maSinhViens}});
    return sinhViens;
  },

  cau25: async () => {
    const thongKes = await SinhVien.aggregate([
      {
        $lookup: {
          from: Lop.collection.name,
          localField: 'maLop',
          foreignField: 'maLop',
          as: 'lop',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] } },
      },
      {
        $project: { lop: 0 },
      },
      {
        $lookup: {
          from: Khoa.collection.name,
          localField: 'maKhoa',
          foreignField: 'maKhoa',
          as: 'khoa',
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] } },
      },
      {
        $project: { khoa: 0 },
      },
      {
        $group: {
          _id: {
            maKhoa: '$maKhoa',
            tenKhoa: '$tenKhoa',
          },
          soLuongSinhVien: { $sum: 1 },
        },
      },
      {
        $project: {
          maKhoa: '$_id.maKhoa',
          tenKhoa: '$_id.tenKhoa',
          soLuongSinhVien: 1,
          _id: 0,
        },
      },
      {
        $sort: { soLuongSinhVien: -1 },
      },
    ]);
    let soLuongSinhVienMax = thongKes[0].soLuongSinhVien;
    let ketQuas = [];
    for (let t of thongKes) {
      if (t.soLuongSinhVien >= soLuongSinhVienMax) {
        ketQuas.push(t);
      } else {
        break;
      }
    }
    return ketQuas;
  },
};
