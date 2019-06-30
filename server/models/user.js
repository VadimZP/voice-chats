import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

// UserSchema.post('save', (error, doc, next) => {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     next(error);
//   }
// });

const User = mongoose.model('User', UserSchema);
export default User;
