const UserModel = require('../database/models/User');
const User = require('../../domain/entities/User');
const IUserRepository = require('../../domain/repositories/IUserRepository');

/**
 * MongoDB implementation of User Repository
 */
class UserRepository extends IUserRepository {
  async findByEmail(email) {
    const userDoc = await UserModel.findOne({ email: email.toLowerCase() });
    if (!userDoc) return null;
    
    const user = new User({
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
      status: userDoc.status,
      createdAt: userDoc.createdAt
    });
    user._id = userDoc._id;
    return user;
  }

  async create(userData) {
    const userDoc = new UserModel({
      email: userData.email.toLowerCase(),
      passwordHash: userData.passwordHash,
      status: userData.status || 'active'
    });
    
    const saved = await userDoc.save();
    
    const user = new User({
      email: saved.email,
      passwordHash: saved.passwordHash,
      status: saved.status,
      createdAt: saved.createdAt
    });
    user._id = saved._id;
    return user;
  }

  async findById(id) {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    
    const user = new User({
      email: userDoc.email,
      passwordHash: userDoc.passwordHash,
      status: userDoc.status,
      createdAt: userDoc.createdAt
    });
    user._id = userDoc._id;
    return user;
  }
}

module.exports = UserRepository;

