const PostModel = require('../database/models/Post');
const Post = require('../../domain/entities/Post');
const IPostRepository = require('../../domain/repositories/IPostRepository');

/**
 * MongoDB implementation of Post Repository
 */
class PostRepository extends IPostRepository {
  async create(postData) {
    const postDoc = new PostModel({
      title: postData.title,
      content: postData.content,
      author: postData.author
    });
    
    const saved = await postDoc.save();
    await saved.populate('author', 'email');
    
    return this._toDomainEntity(saved);
  }

  async findById(id) {
    const postDoc = await PostModel.findById(id).populate('author', 'email');
    if (!postDoc) return null;
    
    return this._toDomainEntity(postDoc);
  }

  async findByAuthor(authorId) {
    const postDocs = await PostModel.find({ 
      author: authorId, 
      isDeleted: false 
    })
    .populate('author', 'email')
    .sort({ createdAt: -1 });
    
    return postDocs.map(doc => this._toDomainEntity(doc));
  }

  async update(id, updateData) {
    const postDoc = await PostModel.findByIdAndUpdate(
      id,
      { 
        ...updateData, 
        updatedAt: new Date() 
      },
      { new: true }
    ).populate('author', 'email');
    
    if (!postDoc) return null;
    
    return this._toDomainEntity(postDoc);
  }

  async softDelete(id) {
    const postDoc = await PostModel.findByIdAndUpdate(
      id,
      { 
        isDeleted: true, 
        updatedAt: new Date() 
      },
      { new: true }
    ).populate('author', 'email');
    
    if (!postDoc) return null;
    
    return this._toDomainEntity(postDoc);
  }

  _toDomainEntity(doc) {
    const post = new Post({
      title: doc.title,
      content: doc.content,
      author: doc.author,
      isDeleted: doc.isDeleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
    post._id = doc._id;
    return post;
  }
}

module.exports = PostRepository;

