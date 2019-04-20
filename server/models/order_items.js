import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderItemsSchema = mongoose.Schema({
  order: {
    type: Schema.Types.ObjectId, ref: 'Order'
  },
  product: {
    type: Schema.Types.ObjectId, ref: 'Product'
  },
  quantity: Number
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_At'}
});

export default mongoose.model("OrderItem", orderItemsSchema);