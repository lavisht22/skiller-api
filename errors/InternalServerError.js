class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.httpCode = 500;
  }
}

module.exports = InternalServerError;
