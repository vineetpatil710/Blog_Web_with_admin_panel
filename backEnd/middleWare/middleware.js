// middleware.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const applyMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
  
  // Serve static files from the 'uploads' directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
};

module.exports = applyMiddleware;
