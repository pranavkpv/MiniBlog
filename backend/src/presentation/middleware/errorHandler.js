/**
 * Centralized Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.message === 'User with this email already exists') {
    statusCode = 409;
    message = err.message;
  } else if (err.message === 'Invalid email or password') {
    statusCode = 401;
    message = err.message;
  } else if (err.message === 'User account is inactive') {
    statusCode = 403;
    message = err.message;
  } else if (err.message === 'Post not found') {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('permission')) {
    statusCode = 403;
    message = err.message;
  } else if (err.message === 'Cannot update a deleted post') {
    statusCode = 400;
    message = err.message;
  } else if (err.message) {
    message = err.message;
  }

  // Validation errors (from express-validator)
  if (err.errors && Array.isArray(err.errors)) {
    statusCode = 400;
    message = err.errors.map(e => e.msg).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };

