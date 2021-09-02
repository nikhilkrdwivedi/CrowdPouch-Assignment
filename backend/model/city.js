import mongoose from 'mongoose';
const citySchema = new mongoose.Schema({
    city: { type: String },
    loc: { type: [Number] },
    pop: { type: Number },
    state: { type: String },
},
    {
        timestamps: true,
        collection: 'city'
    });

export default mongoose.model('city', citySchema)

 