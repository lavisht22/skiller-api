class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.httpCode = 400;
  }
}

module.exports = BadRequestError;
