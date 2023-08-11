
module.exports = async (tokenService, tokenPayload) => {
  if (!tokenPayload.id) {
    throw new Error('Token payload must contain the id')
  }

  const tokens = await tokenService.generateTokens({...tokenPayload})
  await tokenService.saveToken(tokenPayload.id, tokens.refreshToken)

  return tokens
}