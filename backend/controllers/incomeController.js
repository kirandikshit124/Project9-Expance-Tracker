const Income = require('../models/incomeModel');
const XLSX = require('xlsx');
const getDateRange = require('../utils/datefilter').getDateRange;

exports.addIncome = async (req, res) => {
    const { description, amount, category, date } = req.body;
    const userId = req.user._id;
    try{
        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }
        const newIncome = new Income({
            userId,
            description,
            amount,
            category,
            date: new Date(date),
        });
        await newIncome.save();
        return res.status(201).json({
            success: true,
            message: "Income added successfully",
            // income: newIncome,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding income"
        });
    }
}

exports.getAllIncomes = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching incomes"
        });
    }
}

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;
    try{
        const updatedIncome = await Income.findOneAndUpdate(
            { _id: id, userId },  // Ensure the income belongs to the logged-in user
            { description, amount },
            { new: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }
        res.json({
            success: true,
            message: "Income updated successfully",
            income: updatedIncome
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating income"
        });
    }
}

exports.deleteIncome = async (req, res) => {
    try{
        const income = await Income.findByIdAndDelete({_id: req.params.id});
        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }
        res.json({
            success: true,
            message: "Income deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting income"
        });
    }
}


exports.downloadIncomesExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        const plainData = incomes.map(income => ({
            description: income.description,
            amount: income.amount,
            category: income.category,
            date: new Date(income.date).toLocaleDateString(),
        }))
        const workSheet = XLSX.utils.json_to_sheet(plainData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Incomes");
        XLSX.writeFile(workBook, "IncomesData.xlsx");
        res.download("IncomesData.xlsx")
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error downloading incomes"
        });
    }
}

exports.getIncomesByDateRange = async (req, res) => {
    try{
        const userId = req.user._id;
        const { range='monthly' } = req.query;
        const { startDate, endDate } = getDateRange(range);

        const incomes = await Income.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ date: -1 });

        const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
        const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
        const numberOfTransactions = incomes.length;
        const recentTransactions = incomes.slice(0, 5); // Get the 5 most recent transactions

        return res.status(200).json({
            success: true,
            data: {
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                range,
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching incomes by date range"
        });
    }
}