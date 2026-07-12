const mongoose = require('mongoose');

const expenceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        default: 'expense',
    }
})

const expenceModel = mongoose.model('Expense', expenceSchema);
module.exports = expenceModel;