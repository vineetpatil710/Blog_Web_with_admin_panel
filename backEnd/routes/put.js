const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const BlogCategoriesMulter = require('../Multer/BlogCategoriesMulter');
const BannerMulter = require('../Multer/BannerMulter');
const TrendingBlogsMulter = require('../Multer/TrendingBlogsMulter');
const BlogCategoriesmodels = require('../models/BlogCategories');
const Banner = require('../models/Banner');
const TrendingBlog = require('../models/TrendingBlog');
const EditMonetization = require('../models/EditMonetizationBlog');
const BackgroundColor = require('../models/BackgroundColor');
const Footer = require('../models/EditFooter');
const AboutCardMulter =require("../Multer/AboutCardMulter.js")
const AboutCard =require('../models/AboutCard.js');

// PUT update AboutCard with image replacement
router.put('/AboutCard/:id', AboutCardMulter.single('bannerImage'), async (req, res) => {
  try {
    const { category, title } = req.body;
    const updates = { category, title };

    // Find the current document
    const existingCard = await AboutCard.findById(req.params.id);
    if (!existingCard) {
      return res.status(404).json({ message: 'AboutCard not found' });
    }

    // If new image uploaded, delete the old one and update path
    if (req.file) {
      // Delete old image file if it exists
      if (existingCard.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', existingCard.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.warn('Failed to delete old image:', err.message);
        });
      }

      // Set new image path
      updates.imageUrl = req.file.path;
    }

    // Update document in DB
    const updatedCard = await AboutCard.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updatedCard);
  } catch (err) {
    console.error('Error updating AboutCard:', err);
    res.status(400).json({ message: err.message });
  }
});





// PUT - Update footer
router.put('/Footer/:id', async (req, res) => {
  try {
    const updated = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

router.put('/BackgroundColor/:id', async (req, res) => {
  try {
    const { color } = req.body;

    if (!color) {
      return res.status(400).json({ message: 'Color is required in request body' });
    }
    const updated = await BackgroundColor.findByIdAndUpdate(
      req.params.id,
      { color },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update color', error: err.message });
  }
});



// Helper to delete old image file
const deleteOldImage = (imageUrl) => {
  if (imageUrl) {
    const filePath = path.join(__dirname, '..', imageUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete old image:', err.message);
    });
  }
};

// ✅ PUT - Update EditMonetization
router.put('/:id', async (req, res) => {
  const { EditMonetizationBlog } = req.body;
  try {
    const updated = await EditMonetization.findByIdAndUpdate(
      req.params.id,
      { EditMonetizationBlog },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating EditMonetization', error });
  }
});

// ✅ PUT - Update BlogCategories with image replace
router.put('/BlogCategories/:id', BlogCategoriesMulter.single('bannerImage'), async (req, res) => {
  try {
    const { category, title, author, posts } = req.body;
    const updateFields = { category, title, author, posts };

    const existing = await BlogCategoriesmodels.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Blog Category not found.' });

    if (req.file) {
      deleteOldImage(existing.imageUrl);
      updateFields.imageUrl = `/uploads/BlogCategories/${req.file.filename}`;
    }

    const updated = await BlogCategoriesmodels.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Blog Category.', error: err.message });
  }
});

// ✅ PUT - Update Banner with image replace
router.put('/Banner/:id', BannerMulter.single('bannerImage'), async (req, res) => {
  const { tagline, message, description } = req.body;
  try {
    const bannerToUpdate = await Banner.findById(req.params.id);
    if (!bannerToUpdate) return res.status(404).json({ message: 'Banner not found.' });

    if (req.file) {
      deleteOldImage(bannerToUpdate.imageUrl);
      bannerToUpdate.imageUrl = `/uploads/Banner/${req.file.filename}`;
    }

    bannerToUpdate.tagline = tagline;
    bannerToUpdate.message = message;
    bannerToUpdate.description = description;

    const updated = await bannerToUpdate.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Banner.', error });
  }
});

// ✅ PUT - Update TrendingBlog with image replace
router.put('/TrendingBlog/:id', TrendingBlogsMulter.single('bannerImage'), async (req, res) => {
  const { BlogTitle, AgeRatings } = req.body;
  try {
    const trendingBlog = await TrendingBlog.findById(req.params.id);
    if (!trendingBlog) return res.status(404).json({ message: 'TrendingBlog not found.' });

    if (req.file) {
      deleteOldImage(trendingBlog.imageUrl);
      trendingBlog.imageUrl = `/uploads/TrendingBlogs/${req.file.filename}`;
    }

    trendingBlog.BlogTitle = BlogTitle;
    trendingBlog.AgeRatings = AgeRatings;

    const updated = await trendingBlog.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Trending Blog.', error });
  }
});

module.exports = router;
