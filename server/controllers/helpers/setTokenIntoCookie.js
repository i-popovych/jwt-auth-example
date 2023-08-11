module.exports = (res, refreshToken, maxAge = 30 * 24 * 60 * 60 * 1000) => {
  res.cookie('refreshToken', refreshToken, { maxAge, httpOnly: true })
}