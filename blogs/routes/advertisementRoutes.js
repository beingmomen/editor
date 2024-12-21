const express = require('express');
const controller = require('../controllers/_advertisementController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/active', controller.getActiveAdvertisements);

// Protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(controller.getAllAdvertisements)
  .post(controller.createAdvertisement);

router
  .route('/:id')
  .get(controller.getAdvertisement)
  .patch(controller.updateAdvertisement)
  .delete(controller.deleteAdvertisement);

module.exports = router;
