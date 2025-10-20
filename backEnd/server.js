// server.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const applyMiddleware = require('./middleWare/middleware'); // <-- Import middlewar
const bannerRoutesGET = require('./routes/get'); //get Api
const bannerRoutesPOST = require('./routes/post'); //post api
const bannerRoutesPUT = require('./routes/put');//put api
const bannerRoutesDELETE = require('./routes/delete');//delete api

const app = express();
const PORT = process.env.PORT || 5000;





// --- Middleware ---
// Apply all middleware
applyMiddleware(app);


// Connect to MongoDB
connectDB();


// --- API Routes ---
// GET: Fetch all banners to populate the dropdown
// Use the routes
app.use(bannerRoutesGET);


// POST: Create a new banner
// 'bannerImage' must match the key in FormData from the frontend
// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes with /api prefix
app.use('/api', bannerRoutesPOST);




// PUT: Update an existing banner by its ID
app.use(express.json());
app.use('/', bannerRoutesPUT);


// DELETE route to delete banner by ID
app.use('/api', bannerRoutesDELETE)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

