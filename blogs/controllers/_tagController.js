const Model = require('../models/tagModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllTags = factory.getAll(Model);
exports.getTag = factory.getOne(Model);
exports.createTag = factory.createOne(Model);
exports.updateTag = factory.updateOne(Model);
exports.deleteTag = factory.deleteOne(Model);

exports.getTagWithArticles = catchAsync(async (req, res, next) => {
  const tag = await Model.findById(req.params.id).populate({
    path: 'articles',
    select: 'title slug featuredImage publishedAt views'
  });

  res.status(200).json({
    status: 'success',
    data: {
      tag
    }
  });
});
