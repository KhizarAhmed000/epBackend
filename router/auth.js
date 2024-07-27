const express = require("express");
const router = express.Router();
const authController = require('../controller/auth');
const uploadProfile = require("../controller/uploadProfile");
const uploadPdf = require("../controller/uploadPdf");

router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/uploadProfile', uploadProfile)
router.post('/uploadPdf',uploadPdf)

module.exports = router;