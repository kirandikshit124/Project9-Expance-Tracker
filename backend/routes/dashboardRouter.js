const express = require('express')
const authMiddleware = require('../middleware/auth')
const controller = require('../controllers/dashboardController')

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, controller.getDashboardOverview);

module.exports = dashboardRouter;