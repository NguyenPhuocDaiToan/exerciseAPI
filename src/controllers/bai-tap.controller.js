const httpStatus = require('http-status');
const {baiTapService} = require('../services/index');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

module.exports = {
    cau1: catchAsync(async (req, res) => {
        const lops = await baiTapService.cau1();
        res.status(httpStatus.OK).send(lops);
    }),

    cau2: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau2();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau3: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau3();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau4: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau4();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau5: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau5();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau6: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau6();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau7: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau7();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau8: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau8();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau9: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau9();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau10: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau10();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau11: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau11();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau12: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau12();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau13: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau13();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau14: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau14();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau15: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau15();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau16: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau16();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau17: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau17();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau18: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau18();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau19: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau19();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau20: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau20();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau21: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau21();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau22: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau22();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau23: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau23();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau24: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau24();
        res.status(httpStatus.OK).send(sinhViens);
    }),

    cau25: catchAsync(async (req, res) => {
        const sinhViens = await baiTapService.cau25();
        res.status(httpStatus.OK).send(sinhViens);
    }),
}
