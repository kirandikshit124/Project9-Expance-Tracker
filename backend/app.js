const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();
const authRouter = require('./routes/authRouter');
const incomeRouter = require('./routes/incomeRouter');
const expenseRouter = require('./routes/expenseRouter');
const dashboardRouter = require('./routes/dashboardRouter');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://spendly-assistant.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', authRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/dashboard', dashboardRouter);

app.get('/', (req, res, next) => {
  res.send('Welcome to the Expense Tracker API');
});

// DB connection
const PORT = process.env.PORT || 3001;
const mongodbURL = process.env.MONGO_URI;
mongoose.connect(mongodbURL)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});