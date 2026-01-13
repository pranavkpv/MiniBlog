const bcrypt = require('bcryptjs');

/**
 * Password Service for hashing and verification
 */
class PasswordService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = PasswordService;

