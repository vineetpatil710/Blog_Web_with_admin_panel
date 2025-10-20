// routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BlogCategoriesMulter = require('../Multer/BlogCategoriesMulter.js'); // Import multer config
const BlogCategoriesModels = require('../models/BlogCategories.js');  // Adjust path if needed


const upload = require('../Multer/BannerMulter.js'); // Import multer config
const Banner = require('../models/Banner');  // Adjust path if needed
const EditMonetization = require('../models/EditMonetizationBlog.js');
const TrendingBlog = require('../models/TrendingBlog');  // Adjust path if needed
const TrendingBlogsupload = require('../Multer/TrendingBlogsMulter'); // Import multer config
const BackgroundColor = require('../models/BackgroundColor.js')
const Footer = require('../models/EditFooter.js')
const AboutText = require('../models/AboutText.js')
const AboutCard = require('../models/AboutCard.js')
const AboutCardMulter = require("../Multer/AboutCardMulter.js")
const Logo = require('../models/EditLogo.js'); // Mongoose model
const LogoMulter = require('../Multer/EditLogo.js'); // Mongoose model
const Contact = require('../models/Contact.js'); // Mongoose model
const EditHeaderColor  = require('../models/EditHeaderColor.js'); // Mongoose model



// POST or UPDATE single color
router.post('/color', async (req, res) => {
  try {
    const { color } = req.body;
    if (!color) {
      return res.status(400).json({ message: 'Color is required.' });
    }

    let colorDoc = await EditHeaderColor.findOne();

    if (colorDoc) {
      colorDoc.color = color;
      await colorDoc.save();
      return res.json({ message: 'Color updated successfully!', color: colorDoc.color });
    } else {
      const newColor = new EditHeaderColor({ color });
      await newColor.save();
      return res.json({ message: 'Color saved successfully!', color: newColor.color });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving color.' });
  }
});


// POST route
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

















// POST or UPDATE logo
router.post('/logo', LogoMulter.single('logo'), async (req, res) => {
  try {
    const existingLogo = await Logo.findOne();

    if (existingLogo) {
      // Delete old image
      const oldPath = existingLogo.imageUrl;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      // Update with new image
      existingLogo.imageUrl = req.file.path.replace(/\\/g, '/');

      await existingLogo.save();

      res.json({ message: 'Logo updated successfully' });
    } else {
      // Create new document
      const newLogo = new Logo({ imageUrl: req.file.path.replace(/\\/g, '/') });
      await newLogo.save();
      res.json({ message: 'Logo uploaded successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});











// Create or update by title
// POST new banner
router.post('/AboutCard', AboutCardMulter.single('bannerImage'), async (req, res) => {
  try {
    const { category, title } = req.body;
    const imageUrl = req.file ? `${req.file.path}` : '';

    const newCard = new AboutCard({ category, title, imageUrl });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// POST (Upsert)
router.post('/AboutText', async (req, res) => {
  try {
    const data = req.body;
    const updated = await AboutText.findOneAndUpdate(
      {}, // Match any document
      data,
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error saving data' });
  }
});


// POST - Create footer (only if no existing doc)
router.post('/Footer', async (req, res) => {
  const exists = await Footer.findOne();
  if (exists) return res.status(400).json({ message: 'Footer already exists. Use PUT to update.' });

  const footer = new Footer(req.body);
  await footer.save();
  res.status(201).json(footer);
});

// POST: Create a new color entry
router.post('/BackgroundColor', async (req, res) => {
  try {
    const { color } = req.body;
    const newColor = new BackgroundColor({ color });
    await newColor.save();
    res.status(201).json(newColor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save color', error: err.message });
  }
});


// POST - Create Edit Monetization
router.post('/EditMonetization', async (req, res) => {
  const { EditMonetizationBlog } = req.body;
  const blog = await EditMonetization.create({ EditMonetizationBlog });
  res.status(201).json(blog);
});




// POST: Create a new Blog Categories
router.post('/BlogCategories', BlogCategoriesMulter.single('bannerImage'), async (req, res) => {
  try {
    const { category, title, author, date, readTime, posts } = req.body;
    const imageUrl = `/uploads/BlogCategories/${req.file.filename}`;
    const newBanner = new BlogCategoriesModels({ category, title, author, date, readTime, posts, imageUrl });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ message: 'Error creating banner.', error: err.message });
  }
});

/* POST  /api/TrendingBlogs  – create */
router.post('/TrendingBlogs', TrendingBlogsupload.single('bannerImage'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image required.' });
  const { BlogTitle, AgeRatings } = req.body;
  const blog = await TrendingBlog.create({
    BlogTitle,
    AgeRatings,
    imageUrl: `/uploads/TrendingBlogs/${req.file.filename}`
  });
  res.status(201).json(blog);
});


// POST: Create a new banner
router.post('/banners', upload.single('bannerImage'), async (req, res) => {
  const { tagline, message, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required.' });
  }

  const newBanner = new Banner({
    tagline,
    message,
    description,
    imageUrl: `uploads/Banner/${req.file.filename}`,
  });

  try {
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ message: 'Banner Tagline input repeated', error });
  }
});

module.exports = router;
