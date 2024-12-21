const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An article must have a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'An article must have content']
    },
    featuredImage: {
      type: String,
      required: [true, 'An article must have a featured image']
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot be more than 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot be more than 160 characters']
    },
    slug: String,
    keywords: [String],
    categories: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Article must belong to at least one category']
    }],
    tags: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Tag'
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    views: {
      type: Number,
      default: 0
    },
    publishedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Article must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
schema.index({ slug: 1 });
schema.index({ title: 'text', content: 'text' });

// Document middleware
schema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Query middleware
schema.pre(/^find/, function(next) {
  this.populate({
    path: 'categories',
    select: 'name slug'
  }).populate({
    path: 'tags',
    select: 'name slug'
  }).populate({
    path: 'author',
    select: 'username'
  });
  next();
});

const Article = mongoose.model('Article', schema);

module.exports = Article;
