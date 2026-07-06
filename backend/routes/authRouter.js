const path = require('path')
const express = require('express');
const authRouter = express.Router();
const controller = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

authRouter.post('/register', controller.registerUser);
authRouter.post('/login', controller.loginUser);

// protected routes
authRouter.get('/me', authMiddleware, controller.getUserProfile);
authRouter.put('/profile', authMiddleware, controller.updateUserProfile);
authRouter.put('/password', authMiddleware, controller.changePassword);

module.exports = authRouter;
