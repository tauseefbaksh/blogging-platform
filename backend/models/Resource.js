const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    fileType: { type: String, enum: ['PDF', 'PPT'], required: true },
    storedFilename: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploaderName: String,
    likes: { type: Number, default: 0 },
    uploadDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Resource', ResourceSchema);