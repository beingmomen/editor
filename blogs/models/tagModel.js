const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tag must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tag name cannot be more than 40 characters']
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
schema.virtual('articles', {
  ref: 'Article',
  foreignField: 'tags',
  localField: '_id'
});

// Document middleware
schema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Index
schema.index({ slug: 1 });

const Tag = mongoose.model('Tag', schema);

module.exports = Tag;
