import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  id: String,
  recoveryToken: String,
  tokenExpire: Date
})

const userModel = mongoose.model("userModel", userSchema)
export default userModel;