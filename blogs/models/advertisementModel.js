const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, 'Advertisement must have a position'],
      enum: ['top', 'middle', 'sidebar'],
      default: 'sidebar'
    },
    content: {
      type: String,
      required: [true, 'Advertisement must have content']
    },
    startDate: {
      type: Date,
      required: [true, 'Advertisement must have a start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Advertisement must have an end date']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for querying active ads
schema.index({ isActive: 1, startDate: 1, endDate: 1 });

// Middleware to check if ad is active based on dates
schema.pre(/^find/, function(next) {
  const now = new Date();
  this.find({
    startDate: { $lte: now },
    endDate: { $gte: now },
    isActive: true
  });
  next();
});

const Advertisement = mongoose.model('Advertisement', schema);

module.exports = Advertisement;
