const express = require('express');
const router = express.Router();
const userController = require('../controllers/client');

//USER
router.get('/', userController.getIndexClient);
router.get('/tentang-pastilaundry', userController.getTentangClient);
router.get('/layanan-promo', userController.getLayanan);
router.get('/cek-status', userController.cekStatus);

module.exports = router;