import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: {type:String, unique : true},
  username: {type:String, unique : true},
  password: String,
  cartItems:mongoose.Mixed,
  mobile: String,
  image:String,
  cover:String,
  current_situation:String,
  future_vision:String,
  isVerified: { type: Boolean, default: false }
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_At'}
});

export default mongoose.model("User", userSchema);