const express = require('express');
const app = express();

// ! test api user
app.get('/users', async (req, res) => {
  try {
    res.status(201).json('users');
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});
