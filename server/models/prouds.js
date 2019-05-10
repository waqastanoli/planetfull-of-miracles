import mongoose from 'mongoose';

const proudSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    note: { type: String, required: true },
    createdAt: { format: "%Y-%m-%d", type: Date, required: true, default: Date.now}
});

export default mongoose.model("Prouds", proudSchema);