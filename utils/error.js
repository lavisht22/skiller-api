function handleApiError(err, res) {
  res.status(err.httpCode || 500).json({
    error: true,
    message: err.message || err.name || 'InternalServerError',
  });
}

module.exports = {
  handleApiError,
};
