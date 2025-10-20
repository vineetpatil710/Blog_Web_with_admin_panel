// routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const EditBlogCategories = require('../models/BlogCategories'); // Import the model
const Banner = require('../models/Banner'); // Import the model
const trendingblogs = require('../models/TrendingBlog'); // Import the model
const EditMonetization = require('../models/EditMonetizationBlog'); // Import the model
const BackgroundColor = require('../models/BackgroundColor'); 
const Footer = require('../models/EditFooter'); 
const AboutText = require('../models/AboutText'); 
const AboutCard =require('../models/AboutCard')
const EditLogo= require('../models/EditLogo')
const EditHeaderColor= require('../models/EditHeaderColor')

// GET existing color
router.get('/getcolor', async (req, res) => {
  try {
    const colorDoc = await EditHeaderColor.findOne();
    if (colorDoc) {
      res.json({ color: colorDoc.color });
    } else {
      res.json({ color: '#ffffff' }); // Default if none exists
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching color.' });
  }
});



// GET all logos (should return max 1 document)
router.get('/EditLogo', async (req, res) => {
  try {
    const logos = await EditLogo.find(); // or use findOne() if you're ensuring single document
    res.json(logos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve logo.' });
  }
});




// GET all banners
router.get('/AboutCard', async (req, res) => {
  try {
    const cards = await AboutCard.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET blog/card by title
// router.get('/AboutCard', async (req, res) => {
//   try {
//     const card = await AboutCard.findOne({ title: req.params.title });
//     if (!card) {
//       return res.status(404).json({ message: 'Not found' });
//     }
//     res.json(card);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// GET existing about text
router.get('/AboutText', async (req, res) => {
  try {
    const existing = await AboutText.findOne();
    res.json(existing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// GET - Fetch footer
router.get('/Footer', async (req, res) => {
  const footer = await Footer.findOne();
  res.json(footer);
});


// GET: Fetch the first saved color
router.get('/BackgroundColor', async (req, res) => {
  const color = await BackgroundColor.findOne();
  res.json(color || {});
});




// GET: Fetch all banners
// GET - Fetch existing blog
router.get('/EditMonetizationget', async (req, res) => {
  const blog = await EditMonetization.findOne();
  res.json(blog);
});


// GET all banners
router.get('/BlogCategories', async (req, res) => {
  try {
    const banners = await EditBlogCategories.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve banners.' });
  }
});



// GET: Fetch all trending blogs
router.get('/trendingblogs', async (req, res) => {
  try {
    const blogs = await trendingblogs.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trending blogs', error: err });
  }
});



router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error });
  }
});







module.exports = router;
