class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.httpCode = 404;
  }
}

module.exports = NotFoundError;
