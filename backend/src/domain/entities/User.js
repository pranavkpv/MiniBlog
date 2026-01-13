/**
 * User Domain Entity
 * Represents the core User business entity
 */
class User {
  constructor({ email, passwordHash, status = 'active', createdAt = new Date() }) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.status = status;
    this.createdAt = createdAt;
  }

  isActive() {
    return this.status === 'active';
  }

  toJSON() {
    return {
      email: this.email,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;

