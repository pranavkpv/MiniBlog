const PostService = require('../../application/services/PostService');
const { validationResult } = require('express-validator');

/**
 * Post Controller
 */
class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getPosts = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const posts = await this.postService.getUserPosts(userId);

      res.status(200).json({
        success: true,
        data: posts
      });
    } catch (error) {
      next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { title, content } = req.body;
      const userId = req.user.userId;

      const post = await this.postService.createPost(title, content, userId);

      res.status(201).json({
        success: true,
        data: post
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.user.userId;

      const post = await this.postService.updatePost(id, userId, { title, content });

      res.status(200).json({
        success: true,
        data: post
      });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const post = await this.postService.deletePost(id, userId);

      res.status(200).json({
        success: true,
        data: post,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PostController();

