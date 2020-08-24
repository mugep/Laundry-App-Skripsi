const express = require('express');
// const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');


router.get('/login-admin', authController.loginAdmin)

router.post('/login-admin', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup-admin', authController.getSignup);

router.post('/signup-admin', authController.postSignup);

module.exports = router;