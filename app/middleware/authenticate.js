import User from '../schemas/user.js'

export default async (req, res, next) => {
  try {
    const token = req.header('x-auth')
    const user = await User.findByToken(token)
    if (user) {
      req.user = user
      req.token = token
      next()
    } else {
      res.status('401').send('token not available')
    }
  } catch (err) {
    res.status('401').send(err)
  }
}
