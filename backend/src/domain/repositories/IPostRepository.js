/**
 * Post Repository Interface
 * Defines the contract for post data access
 */
class IPostRepository {
  async create(postData) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByAuthor(authorId) {
    throw new Error('Method not implemented');
  }

  async update(id, updateData) {
    throw new Error('Method not implemented');
  }

  async softDelete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = IPostRepository;

