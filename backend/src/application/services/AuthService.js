const UserRepository = require('../../infrastructure/repositories/UserRepository');
const PasswordService = require('../../infrastructure/auth/PasswordService');
const JwtService = require('../../infrastructure/auth/JwtService');

/**
 * Authentication Service
 * Handles user registration and authentication business logic
 */
class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
    this.jwtService = new JwtService();
  }

  async register(email, password) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.passwordService.hashPassword(password);

    // Create user
    const user = await this.userRepository.create({
      email,
      passwordHash,
      status: 'active'
    });

    // Generate JWT token
    const token = this.jwtService.generateToken({ userId: user._id, email: user.email });

    return {
      user: user.toJSON(),
      token
    };
  }

  async login(email, password) {
    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive()) {
      throw new Error('User account is inactive');
    }

    // Verify password
    const isValidPassword = await this.passwordService.comparePassword(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.jwtService.generateToken({ userId: user._id, email: user.email });

    return {
      user: user.toJSON(),
      token
    };
  }
}

module.exports = AuthService;

