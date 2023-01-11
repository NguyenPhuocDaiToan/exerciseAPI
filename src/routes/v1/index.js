const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const khoaRoute = require('./khoa.route');
const lopRoute = require('./lop.route');
const sinhVienRoute = require('./sinh-vien.route');
const monHocRoute = require('./mon-hoc.route');
const ketQuaRoute = require('./ket-qua.route');
const baiTapRoute = require('./bai-tap.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/khoas',
    route: khoaRoute,
  },
  {
    path: '/lops',
    route: lopRoute,
  },
  {
    path: '/sinh-viens',
    route: sinhVienRoute,
  },
  {
    path: '/mon-hocs',
    route: monHocRoute,
  },
  {
    path: '/ket-quas',
    route: ketQuaRoute,
  },
  {
    path: '/bai-tap',
    route: baiTapRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
