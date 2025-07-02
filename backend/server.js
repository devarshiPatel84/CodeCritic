const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connect } = require('mongoose');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

