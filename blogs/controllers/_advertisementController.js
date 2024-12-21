const Model = require('../models/advertisementModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAdvertisements = factory.getAll(Model);
exports.getAdvertisement = factory.getOne(Model);
exports.createAdvertisement = factory.createOne(Model);
exports.updateAdvertisement = factory.updateOne(Model);
exports.deleteAdvertisement = factory.deleteOne(Model);

exports.getActiveAdvertisements = catchAsync(async (req, res, next) => {
  const { position } = req.query;
  const query = { isActive: true };
  
  if (position) {
    query.position = position;
  }

  const now = new Date();
  query.startDate = { $lte: now };
  query.endDate = { $gte: now };

  const advertisements = await Model.find(query);

  res.status(200).json({
    status: 'success',
    results: advertisements.length,
    data: {
      advertisements
    }
  });
});
