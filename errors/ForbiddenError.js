class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.httpCode = 403;
  }
}

module.exports = ForbiddenError;
