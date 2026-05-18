const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.get('/resources', async (req, res) => {
    const { search, subject } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (subject && subject !== 'All') query.subject = subject;

    const resources = await Resource.find(query).sort({ uploadDate: -1 });
    res.json(resources);
});

router.patch('/resources/:id/like', async (req, res) => {
    const resource = await Resource.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    res.json({ likes: resource.likes });
});
module.exports = router;