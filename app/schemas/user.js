import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// User Model to store User Register information and tokens
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

// verifying token

userSchema.statics.findByToken = async function (token) {
  const User = this
  let tokenData
  tokenData = await jwt.verify(token, 'jwt@123')
  if (tokenData) {
    return User.findOne({
      _id: tokenData._id,
      'tokens.token': token
    })
  } else {
    throw err
  }
}

// Generating token

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

// verifying user credentials for login

userSchema.statics.findByCredentials = async function (username, password) {
  const User = this;
  const user = await User.findOne({ username });
  if (user) {
    const decoded = await bcryptjs.compare(password, user.password)
    if (!decoded) {
      throw "Invalid Password";
    }
    return user
  } else {
    throw "Invalid Username";
  }
};

const User = mongoose.model('User', userSchema)
export default User;