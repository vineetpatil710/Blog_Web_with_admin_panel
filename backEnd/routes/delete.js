// // routes/bannerRoutes.js
// const express = require('express');
// const router = express.Router();
// const BlogCategories = require('../models/BlogCategories');
// const Banner = require('../models/Banner');
// const TrendingBlog = require('../models/TrendingBlog');

// // ✅ Generic deletion handler
// const deleteById = (Model, name) => async (req, res) => {
//   try {
//     const deletedItem = await Model.findByIdAndDelete(req.params.id);
//     if (!deletedItem) {
//       return res.status(404).json({ message: `${name} not found.` });
//     }
//     res.status(200).json({ message: `${name} deleted successfully.` });
//   } catch (error) {
//     res.status(500).json({ message: `Server error while deleting ${name}.`, error: error.message });
//   }
// };

// // ✅ Delete routes using the generic handler
// router.delete('/BlogCategories/:id', deleteById(BlogCategories, 'Blog Category'));
// router.delete('/banners/:id', deleteById(Banner, 'Banner'));
// router.delete('/trendingblogs/:id', deleteById(TrendingBlog, 'Trending Blog'));

// module.exports = router;




const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const BlogCategories = require('../models/BlogCategories');
const Banner = require('../models/Banner');
const TrendingBlog = require('../models/TrendingBlog');
const AboutCard = require('../models/AboutCard')

// ✅ Generic deletion handler with image deletion
const deleteById = (Model, name) => async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: `${name} not found.` });
    }

    // Delete the image from the server if imageUrl exists
    if (item.imageUrl) {
      const filePath = path.join(__dirname, '..', item.imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete image for ${name}:`, err.message);
      });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${name} deleted successfully.` });

  } catch (error) {
    res.status(500).json({ message: `Server error while deleting ${name}.`, error: error.message });
  }
};

// ✅ Delete routes (no multer needed for delete)
router.delete('/BlogCategories/:id', deleteById(BlogCategories, 'Blog Category'));
router.delete('/banners/:id', deleteById(Banner, 'Banner'));
router.delete('/trendingblogs/:id', deleteById(TrendingBlog, 'Trending Blog'));
// router.delete('/AboutCard/:id', deleteById(AboutCard, 'About Card'));

// DELETE AboutCard and its image
router.delete('/AboutCard/:id', async (req, res) => {
  try {
    const card = await AboutCard.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'AboutCard not found' });

    // Delete image file from server
    if (card.imageUrl) {
      const imagePath = path.join(__dirname, '..', card.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Failed to delete image:', err.message);
      });
    }

    // Delete document from DB
    await AboutCard.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting AboutCard:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
