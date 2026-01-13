const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/PostController');

const router = express.Router();

// All post routes require authentication
router.use(authMiddleware);

// Validation rules
const postValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
];

// Routes
router.get('/', postController.getPosts);
router.post('/', postValidation, postController.createPost);
router.put('/:id', postValidation, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;

