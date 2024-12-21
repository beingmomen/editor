const Model = require('../models/articleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.setUserIdAndDate = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  if (req.body.status === 'published' && !req.body.publishedAt) {
    req.body.publishedAt = Date.now();
  }
  next();
};

exports.getAllArticles = factory.getAll(Model);
exports.getArticle = factory.getOne(Model);
exports.createArticle = factory.createOne(Model);
exports.updateArticle = factory.updateOne(Model);
exports.deleteArticle = factory.deleteOne(Model);

exports.searchArticles = catchAsync(async (req, res, next) => {
  const {
    query,
    category,
    tags,
    status,
    dateRange,
    sortBy = '-publishedAt'
  } = req.query;

  const searchQuery = {};

  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }

  // Category filter
  if (category) {
    searchQuery.categories = category;
  }

  // Tags filter
  if (tags) {
    searchQuery.tags = { $in: tags.split(',') };
  }

  // Status filter
  if (status) {
    searchQuery.status = status;
  }

  // Date range filter
  if (dateRange) {
    const [start, end] = dateRange.split(',');
    searchQuery.publishedAt = {
      $gte: new Date(start),
      $lte: new Date(end)
    };
  }

  // Execute query
  const articles = await Model.find(searchQuery)
    .sort(sortBy)
    .populate('categories')
    .populate('tags')
    .populate('author', 'username');

  res.status(200).json({
    status: 'success',
    results: articles.length,
    data: {
      articles
    }
  });
});

exports.incrementViews = catchAsync(async (req, res, next) => {
  const article = await Model.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!article) {
    return next(new AppError('No article found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      article
    }
  });
});
