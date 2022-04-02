export const errorCodes = {
  alreadyExist: 'alreadyExist',
  notFound: "notFound",
  validationError: "validationError",
  usernameValidation: "usernameValidation",
  passwordValidation: "passwordValidation"
}

export default (error, req, res, next) => {
  switch (error.code) {
    case errorCodes.alreadyExist:
      return res.status(409).send('Already exist')
    case errorCodes.notFound:
      return res.status(404).send('Not found')
    case errorCodes.validationError:
      return res.status(401).send('All fields are required')
    case errorCodes.usernameValidation:
      return res.status(401).send('"UserName must be at least 3"')
    case errorCodes.passwordValidation:
      return res.status(401).send('"Password must be at least 6"')
    default:
      return res.status(500).send('Unknown error')
  }
}