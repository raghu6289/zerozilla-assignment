export const errorCodes = {
  alreadyExist: 'alreadyExist',
  notFound: "notFound",
}

export default (error, req, res, next) => {
  switch (error.code) {
    case errorCodes.alreadyExist:
      return res.status(409).send('Already exist')
    case errorCodes.notFound:
      return res.status(401).send('Not found')
    default:
      return res.status(500).send('Unknown Error')
  }
}