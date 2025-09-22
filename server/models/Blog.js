const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  images_alt: {
    type: String,
    default: 'MogiApp Blog Image'
  },
  images_source: {
    type: String,
    default: 'Morfogenesis Teknologi Indonesia Creative Team'
  },
  createdBy: {
    type: String,
    default: 'Admin'
  },
  source: {
    type: String,
    default: 'Morfogenesis Teknologi Indonesia'
  },
  isShow: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);