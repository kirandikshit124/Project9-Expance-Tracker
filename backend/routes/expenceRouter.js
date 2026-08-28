const express = require('express');
const authMiddleware = require('../middleware/auth');
const controller = require('../controllers/expenceController');

const expenseRouter = express.Router();

expenseRouter.post('/add', authMiddleware, controller.addexpense);
expenseRouter.get('/get', authMiddleware, controller.getAllexpenses);

expenseRouter.put('/update/:id', authMiddleware, controller.updateexpense);
expenseRouter.get('/downloadexcel', authMiddleware, controller.downloadexpensesExcel);

expenseRouter.delete('/delete/:id', authMiddleware, controller.deleteexpense);
expenseRouter.get('/overview', authMiddleware, controller.getexpensesByDateRange);

module.exports = expenseRouter;