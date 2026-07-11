const express = require('express');
const authMiddleware = require('../middleware/auth');
const controller = require('../controllers/incomeController');

const incomeRouter = express.Router();

incomeRouter.post('/add', authMiddleware, controller.addIncome);
incomeRouter.get('/get', authMiddleware, controller.getAllIncomes);

incomeRouter.put('/update/:id', authMiddleware, controller.updateIncome);
incomeRouter.get('/downloadexcel', authMiddleware, controller.downloadIncomesExcel);

incomeRouter.delete('/delete/:id', authMiddleware, controller.deleteIncome);
incomeRouter.get('/overview', authMiddleware, controller.getIncomesByDateRange);

module.exports = incomeRouter;