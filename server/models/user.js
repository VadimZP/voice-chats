import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
