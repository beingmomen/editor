const express = require('express');
const controller = require('../controllers/_tagController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', controller.getAllTags);
router.get('/:id', controller.getTag);
router.get('/:id/articles', controller.getTagWithArticles);

// Protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'editor'));

router
  .route('/')
  .post(controller.createTag);

router
  .route('/:id')
  .patch(controller.updateTag)
  .delete(authController.restrictTo('admin'), controller.deleteTag);

module.exports = router;
