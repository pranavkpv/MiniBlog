const jwt = require('jsonwebtoken');

/**
 * JWT Service for token generation and verification
 */
class JwtService {
  constructor(secret) {
    this.secret = secret || process.env.JWT_SECRET;
  }

  generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = JwtService;

