import mongoose from 'mongoose';
const citySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fileName: { type: String, default: null },
    fileUrl: { type: String, default: null },
    assetId: { type: String, default: null },
    publicId: { type: String, default: null },
    versionId: { type: String, default: null },
    version: { type: Number, default: null },
    signature: { type: String, default: null },
    format: { type: String, default: null },
    resourceType: { type: String, default: null },
    bytes: { type: Number, default: null },
},
{
        timestamps: true,
        collection: 'video'
}
);

export default mongoose.model('video', citySchema)

 