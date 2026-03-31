const express = require('express');
const router = express.Router();
const {authController,loginController, resetPasswordController} = require('../controller/auth-controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',authController)
router.post('/login',loginController)
router.post('/reset-password',authMiddleware, resetPasswordController)

module.exports = router;