const express = require('express');
const controller = require('../controllers/_articleController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', controller.getAllArticles);
router.get('/search', controller.searchArticles);
router.get('/:id', controller.getArticle);
router.patch('/:id/increment-views', controller.incrementViews);

// Protected routes
router.use(authController.protect);

// Editor and Admin routes
router.use(authController.restrictTo('editor', 'admin'));
router
  .route('/')
  .post(
    controller.setUserIdAndDate,
    controller.createArticle
  );

router
  .route('/:id')
  .patch(controller.updateArticle)
  .delete(authController.restrictTo('admin'), controller.deleteArticle);

module.exports = router;
