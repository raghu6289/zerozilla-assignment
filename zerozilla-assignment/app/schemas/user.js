import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

userSchema.pre('save', function (next) {
  const user = this
  if (user.isNew) {            //the function executes only when the user is new
    bcryptjs.genSalt(10)
      .then(function (salt) {
        bcryptjs.hash(user.password, salt)
          .then(function (encryptedPassword) {
            user.password = encryptedPassword
            next()
          })
      })
  } else {
    next()
  }
})


userSchema.statics.findByToken = function (token) {
  const User = this
  let tokenData
  try {
    tokenData = jwt.verify(token, 'jwt@123')
  } catch (err) {
    return Promise.reject(err)
  }
  return User.findOne({
    _id: tokenData._id,
    'tokens.token': token
  })
}


userSchema.methods.generateToken = function () {
  const user = this
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  }
  const token = jwt.sign(tokenData, 'jwt@123')
  user.tokens.push({
    token
  })
  return user.save()
    .then(function (user) {
      return Promise.resolve({
        token
      })
    })
    .catch(function (err) {
      return Promise.reject(err)
    })
}


userSchema.statics.findByCredentials = function (username, password) {
  const User = this
  return User.findOne({ username })
    .then(function (user) {
      if (!user) {
        return Promise.reject('invalid username')
      }
      return bcryptjs.compare(password, user.password)
        .then(function (result) {
          if (result) {
            return Promise.resolve(user)
          } else {
            return Promise.reject('invalid password')
          }
        })
    })
    .catch(function (err) {
      return Promise.reject(err)
    })
}


const User = mongoose.model('User', userSchema)

export default User;