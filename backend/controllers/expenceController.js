const expense = require('../models/expenceModel');
const XLSX = require('xlsx');
const getDateRange = require('../utils/dateFilter').getDateRange;

exports.addexpense = async (req, res) => {
    const { description, amount, category, date } = req.body;
    const userId = req.user._id;
    try{
        if(!description || !amount || !category || !date){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const newexpense = new expense({
            userId,
            description,
            amount,
            category,
            date: new Date(date),
        });
        await newexpense.save();
        res.status(201).json({
            success: true,
            message: "Expense added successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding expense"
        });
    }
}

exports.getAllexpenses = async (req, res) => {
    const userId = req.user._id;
    try{
        const expenses = await expense.find({ userId }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching expenses"
        });
    }
}

exports.updateexpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;
    try{
        const updatedexpense = await expense.findOneAndUpdate(
            { _id: id, userId },  // This line means that we are looking for an expense with the given id and userId, ensuring that the expense belongs to the logged-in user.
            { description, amount, category, date: new Date(date) },
            { new: true, runValidators: true }   // This option ensures that the updated document is returned.
        );
        if (!updatedexpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.json({
            success: true,
            message: "Expense updated successfully",
            expense: updatedexpense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating expense"
        });
    }
}

exports.deleteexpense = async (req, res) => {
    try{
        const deletedexpense = await expense.findOneAndDelete({ _id: req.params.id });
        if (!deletedexpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting expense"
        });
    }
}

exports.downloadexpensesExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const expenses = await expense.find({ userId }).sort({ date: -1 });
        const plainData = expenses.map(expense => ({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            date: new Date(expense.date).toLocaleDateString(),
        }))
        const workSheet = XLSX.utils.json_to_sheet(plainData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "expenses");
        XLSX.writeFile(workBook, "expensesData.xlsx");
        res.download("expensesData.xlsx")
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error downloading expenses"
        });
    }
}

exports.getexpensesByDateRange = async (req, res) => {
    try{
        const userId = req.user._id;
        const { range='monthly' } = req.query;
        const { startDate, endDate } = getDateRange(range);

        const expenses = await expense.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ date: -1 });

        const totalexpense = expenses.reduce((total, expense) => total + expense.amount, 0);
        const averageexpense = expenses.length > 0 ? totalexpense / expenses.length : 0;
        const numberOfTransactions = expenses.length;
        const recentTransactions = expenses.slice(0, 5); // Get the 5 most recent transactions

        return res.status(200).json({
            success: true,
            data: {
                totalexpense,
                averageexpense,
                numberOfTransactions,
                recentTransactions,
                range,
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching expenses by date range"
        });
    }
}