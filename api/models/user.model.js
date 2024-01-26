import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  profilePicture: {
    type: String,
    default: "../../client/src/assets/img2.jpg"
  }
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;