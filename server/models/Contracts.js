import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
    from :{ format: "%Y-%m-%d", type: Date, required: true},
    to :{ format: "%Y-%m-%d", type: Date},
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true, enum: ['Open', 'Completed'],
       default : 'Open' },
    serverType: { type: String, required: true, enum: ['me', 'others'],
       default : 'me' },   
    rating: { type: Number },
    createdAt: { format: "%Y-%m-%d", type: Date, required: true, default: Date.now}
});

export default mongoose.model("Contracts", contractSchema);