import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartItems:mongoose.Mixed,
  mobile: String,
  isVerified: { type: Boolean, default: false }
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_At'}
});

export default mongoose.model("User", userSchema);