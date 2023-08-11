const ApiError = require("../exeptions")

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({message: err.message, errors: err.errors})
  }

  return res.status(500).send({message: 'Internal server error', error: err.message})
}