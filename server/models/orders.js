import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  country: String,
  address_1: String,
  address_2: String,
  state: String,
  city: String,
  url: String,
  zipCode: String,
  phone: String,
  email: String,
  comments: String,
  total: Number,
  shipping_method: String,
  order_items: [{
    type: Schema.Types.ObjectId, ref: 'OrderItem'
  }]
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_At'}
});

export default mongoose.model("Order", orderSchema);