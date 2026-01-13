const PostRepository = require('../../infrastructure/repositories/PostRepository');
const UserRepository = require('../../infrastructure/repositories/UserRepository');

/**
 * Post Service
 * Handles post-related business logic with ownership enforcement
 */
class PostService {
  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  async createPost(title, content, authorId) {
    // Verify author exists
    const author = await this.userRepository.findById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    // Create post
    const post = await this.postRepository.create({
      title,
      content,
      author: authorId
    });

    return post.toJSON();
  }

  async getUserPosts(userId) {
    const posts = await this.postRepository.findByAuthor(userId);
    return posts.map(post => post.toJSON());
  }

  async getPostById(postId) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return post.toJSON();
  }

  async updatePost(postId, userId, updateData) {
    // Get post
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    // Enforce ownership
    if (!post.belongsTo(userId)) {
      throw new Error('You do not have permission to update this post');
    }

    // Check if deleted
    if (post.isDeleted) {
      throw new Error('Cannot update a deleted post');
    }

    // Update post
    const updatedPost = await this.postRepository.update(postId, updateData);
    return updatedPost.toJSON();
  }

  async deletePost(postId, userId) {
    // Get post
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    // Enforce ownership
    if (!post.belongsTo(userId)) {
      throw new Error('You do not have permission to delete this post');
    }

    // Soft delete
    const deletedPost = await this.postRepository.softDelete(postId);
    return deletedPost.toJSON();
  }
}

module.exports = PostService;

