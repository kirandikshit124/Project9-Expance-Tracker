const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const mongodbURL = "mongodb+srv://kirandikshit124_db_user:dikshit@projects.3gr107d.mongodb.net/expense-tracker?appName=Projects"
dotenv.config();
const authRouter = require('./routes/authRouter');
const incomeRouter = require('./routes/incomeRouter');
const expenceRouter = require('./routes/expenceRouter');
const dashboardRouter = require('./routes/dashboardRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', authRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expence', expenceRouter);
app.use('/api/dashboard', dashboardRouter);

app.get('/', (req, res, next) => {
  res.send('Welcome to the Expense Tracker API');
});

// DB connection
const PORT=3001;
mongoose.connect(mongodbURL)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});