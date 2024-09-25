const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/check-auth', verifyToken, AuthController.checkSession);

router.post('/logout', AuthController.logout);

module.exports = router;
