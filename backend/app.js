const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res, next) => {
  res.send('Welcome to the Expense Tracker API');
});

// DB connection

const PORT=3001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});