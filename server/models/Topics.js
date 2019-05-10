import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { format: "%Y-%m-%d", type: Date, required: true, default: Date.now}
});

export default mongoose.model("Topics", topicSchema);