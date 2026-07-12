const Expence = require('../models/expenceModel');
const XLSX = require('xlsx');
const getDateRange = require('../utils/datefilter').getDateRange;

exports.addExpence = async (req, res) => {
    const { description, amount, category, date } = req.body;
    const userId = req.user._id;
    try{
        if(!description || !amount || !category || !date){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const newExpence = new Expence({
            userId,
            description,
            amount,
            category,
            date: new Date(date),
        });
        await newExpence.save();
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

exports.getAllExpences = async (req, res) => {
    const userId = req.user._id;
    try{
        const expences = await Expence.find({ userId }).sort({ date: -1 });
        res.json(expences);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching expenses"
        });
    }
}

exports.updateExpence = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { description, amount } = req.body;
    try{
        const updatedExpence = await Expence.findOneAndUpdate(
            { _id: id, userId },  // This line means that we are looking for an expense with the given id and userId, ensuring that the expense belongs to the logged-in user.
            { description, amount },
            { new: true }   // This option ensures that the updated document is returned.
        );
        if (!updatedExpence) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.json({
            success: true,
            message: "Expense updated successfully",
            expense: updatedExpence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating expense"
        });
    }
}

exports.deleteExpence = async (req, res) => {
    try{
        const deletedExpence = await Expence.findOneAndDelete({ _id: req.params.id });
        if (!deletedExpence) {
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

exports.downloadExpencesExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const expences = await Expence.find({ userId }).sort({ date: -1 });
        const plainData = expences.map(expence => ({
            description: expence.description,
            amount: expence.amount,
            category: expence.category,
            date: new Date(expence.date).toLocaleDateString(),
        }))
        const workSheet = XLSX.utils.json_to_sheet(plainData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Expences");
        XLSX.writeFile(workBook, "ExpencesData.xlsx");
        res.download("ExpencesData.xlsx")
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error downloading expenses"
        });
    }
}

exports.getExpencesByDateRange = async (req, res) => {
    try{
        const userId = req.user._id;
        const { range='monthly' } = req.query;
        const { startDate, endDate } = getDateRange(range);

        const expences = await Expence.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ date: -1 });

        const totalExpence = expences.reduce((total, expence) => total + expence.amount, 0);
        const averageExpence = expences.length > 0 ? totalExpence / expences.length : 0;
        const numberOfTransactions = expences.length;
        const recentTransactions = expences.slice(0, 5); // Get the 5 most recent transactions

        return res.status(200).json({
            success: true,
            data: {
                totalExpence,
                averageExpence,
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