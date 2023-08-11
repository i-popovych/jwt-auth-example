const ApiError = require("../../exeptions")

module.exports = async (DataModel, findOptions, isFieldMustExist, message) => {
  const isFind = !!(await DataModel.findOne({ where: findOptions }))

  if (isFind !== isFieldMustExist) {
    throw ApiError.BadRequest(message)
  }
}