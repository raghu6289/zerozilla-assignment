export const errorCodes = {
  alreadyExist: 'alreadyExist',
  notFound: "notFound",
  validationError: "validationError"
}

export default (error, req, res, next) => {
  switch (error.code) {
    case errorCodes.alreadyExist:
      return res.status(409).send('Already exist')
    case errorCodes.notFound:
      return res.status(404).send('Not found')
    case errorCodes.validationError:
      return res.status(400).send(error.msg || 'Invalid input')
    default:
      return res.status(500).send('Unknown error')
  }
}