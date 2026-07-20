const incomeModel = require('../models/incomeModel')
const expenceModel = require('../models/expenceModel')

exports.getDashboardOverview = async (req, res) => {
    const userId = req.user._id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    try{
        const incomes = await incomeModel.find({
            userId,
            date : { $gte: startOfMonth, $lte: now }
        }).lean();
        const expences = await expenceModel.find({
            userId,
            date : { $gte: startOfMonth, $lte: now }
        }).lean();

        const monthlyIncome = incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0)
        const monthlyExpence = expences.reduce((acc, cur) => acc + Number(cur.amount || 0), 0)
        const savings = monthlyIncome - monthlyExpence
        const savingRate = monthlyIncome === 0 ? 0 : Math.round((savings / monthlyIncome)*100)

        const recentTransaction = [
            ...incomes.map((i) => ({ ...i, type: "income"})),
            ...expences.map((e) => ({ ...e, type: "expence"})),
        ].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        const spendByCategory = {};
        for(const exp of expences){
            const cat = exp.category || "Other";
            spendByCategory[cat] = (spendByCategory[cat] || 0) + Number(exp.amount || 0)
        }

        const expenseDistribution = Object.entries(spendByCategory).map(([category, amount]) => ({
            category,
            amount,
            percent: monthlyExpence === 0 ? 0 : Math.round((amount / monthlyExpence)*100)
        }))

        return res.status(200).json({
            success: true,
            data: {
                monthlyIncome,
                monthlyExpence,
                savings,
                savingRate,
                recentTransaction,
                spendByCategory,
                expenseDistribution
            }
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Dashboard fetch failed",
        })
    }
}