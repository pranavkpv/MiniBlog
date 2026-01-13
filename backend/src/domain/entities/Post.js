/**
 * Post Domain Entity
 * Represents the core Post business entity
 */
class Post {
  constructor({ title, content, author, isDeleted = false, createdAt = new Date(), updatedAt = new Date() }) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  markAsDeleted() {
    this.isDeleted = true;
    this.updatedAt = new Date();
  }

  update({ title, content }) {
    if (title !== undefined) this.title = title;
    if (content !== undefined) this.content = content;
    this.updatedAt = new Date();
  }

  belongsTo(userId) {
    return this.author.toString() === userId.toString();
  }

  toJSON() {
    return {
      id: this._id,
      title: this.title,
      content: this.content,
      author: this.author,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Post;

