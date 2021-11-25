const express = require('express')
const router = express.Router();
const { verify, processPayment } = require('../controllers/razorpay')

const { requireSignin, isAuth, } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/razorpay/verification/:userId', verify)
router.post('/razorpay/payment/:userId', processPayment)

router.param('userId', userById);

module.exports = router;