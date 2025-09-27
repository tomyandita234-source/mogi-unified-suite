const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
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
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['pos', 'pay', 'ops', 'fleet', 'sign', 'library', 'kampuz', 'dynamics', 'studio']
  },
  features: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  pricing: {
    basic: {
      price: String,
      period: String,
      features: [String]
    },
    pro: {
      price: String,
      period: String,
      features: [String]
    },
    enterprise: {
      price: String,
      period: String,
      features: [String]
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);