import mongoose from 'mongoose';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
//db.getCollection('categories').createIndex({name:1}, { unique: true })
const categorySchema = mongoose.Schema({
  name: { type :String, unique : true, required : true, dropDups: true },
  parent: String,
  deleted_at: Date
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model("Categories", categorySchema);