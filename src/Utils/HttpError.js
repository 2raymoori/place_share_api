class HttpError extends Error {
  constructor(msg, code = 201) {
    super(msg);
    this.status = code;
  }
}

module.exports = HttpError;
