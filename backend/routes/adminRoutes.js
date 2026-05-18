const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Resource = require('../models/Resource');
const fs = require('fs');
const path = require('path');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/pending-users', async (req, res) => {
    const users = await User.find({ role: 'Facilitator', isApproved: false }).select('-password');
    res.json(users);
});

router.patch('/approve/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'User approved.' });
});

router.delete('/resource/:id', async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
        fs.unlink(path.join(__dirname, '..', 'uploads', resource.storedFilename), () => {});
        await Resource.findByIdAndDelete(req.params.id);
    }
    res.json({ message: 'Resource incinerated.' });
});

module.exports = router;