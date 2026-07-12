const express = require('express');
const authMiddleware = require('../middleware/auth');
const controller = require('../controllers/expenceController');

const expenceRouter = express.Router();

expenceRouter.post('/add', authMiddleware, controller.addExpence);
expenceRouter.get('/get', authMiddleware, controller.getAllExpences);

expenceRouter.put('/update/:id', authMiddleware, controller.updateExpence);
expenceRouter.get('/downloadexcel', authMiddleware, controller.downloadExpencesExcel);

expenceRouter.delete('/delete/:id', authMiddleware, controller.deleteExpence);
expenceRouter.get('/overview', authMiddleware, controller.getExpencesByDateRange);

module.exports = expenceRouter;