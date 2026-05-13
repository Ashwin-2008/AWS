require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/students', require('./routes/studentRoutes'));

app.get('/', (req, res) => {
  res.send('Student Management System Running');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
