const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


// /admin/
router.get('/add-pelanggan',isAuth, adminController.getAddPelanggan)

router.post('/add-pelanggan',isAuth, adminController.postAddPelanggan)

router.get('/data-pelanggan',isAuth, adminController.getDataPelanggan);

router.get('/data-pelanggan/:pelangganId',isAuth, adminController.getPelanggan);

router.post('/data-pelanggan',isAuth, adminController.updatePelanggan);

router.post('/hapus-pelanggan',isAuth, adminController.hapusPelanggan)

router.get('/data-invoice/:orderId', adminController.getInvoice)

router.get('/laporan-pelanggan', adminController.getLaporan);

router.get('/print-laporan', adminController.printLaporan);

module.exports = router