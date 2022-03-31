import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Must be at least 3"]
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
});




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

userSchema.methods.generateToken = async function () {
  const user = this // "this" is used to bring the user details like username,_id
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  }
  const token = await jwt.sign(tokenData, 'jwt@123')
  user.tokens.push({ token })
  user.save()
  return ({ token })
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