class SperantException extends Error {
  constructor({ message }) {
    super()
    if (Error.captureStackTrace) Error.captureStackTrace(this, SperantException)
    this.message = message
  }
}

module.exports = { SperantException }