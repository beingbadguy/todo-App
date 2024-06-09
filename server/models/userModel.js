import mongoose from 'mongoose';
let userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    uniqure: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userModel = mongoose.model('User', userModel);
export default userModel;
