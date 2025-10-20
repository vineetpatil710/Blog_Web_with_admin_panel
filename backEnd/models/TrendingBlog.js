const mongoose = require('mongoose');
const trendingBlogSchema = new mongoose.Schema(
  {
    BlogTitle: { type: String, required: true },
    AgeRatings: { type: String, required: true },
    imageUrl: { type: String, required: true } // stored as “/uploads/…”
  },
  //   { timestamps: true }
);



module.exports = mongoose.model('TrendingBlog', trendingBlogSchema);
