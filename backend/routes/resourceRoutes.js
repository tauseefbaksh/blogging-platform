const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const upload = require('../middleware/upload');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.post('/upload', authenticateToken, authorizeRole(['Admin', 'Facilitator']), upload.single('file'), async (req, res) => {
    if (!req.user.isApproved) return res.status(403).json({ message: 'Account not yet approved.' });
    if (!req.file) return res.status(400).json({ message: 'Invalid file.' });

    const ext = req.file.originalname.split('.').pop().toLowerCase();
    const newResource = new Resource({
        title: req.body.title,
        subject: req.body.subject,
        topic: req.body.topic,
        fileType: ext === 'pdf' ? 'PDF' : 'PPT',
        storedFilename: req.file.filename,
        uploader: req.user.id,
        uploaderName: req.user.username
    });
    await newResource.save();
    res.status(201).json(newResource);
});
module.exports = router;