import mongoose from 'mongoose';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

const productSchema = mongoose.Schema({
  name: { type: String, lowercase: true,
        trim:true },
  brand: String,
  model: String,
  proRef: String,
  title: String,
  description: String,
  tags: [{type: String}],
  images: [{type: String}],
  relatedProducts: [{ type: Object }],
  averageRating: Number,
  price: Number,
  quantity: String,
  url: String,
  deleted_at: Date,
  MainCategory:String,
  SubCat1:String,
  SubCat2:String,
  SubCat3:String,
  SubCat4:String,
  SubCat5:String,
  SubCat6:String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model("Product", productSchema);