const { Router } = require('express');
const BucketListItem = require('../../models/BucketListItem');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const bucketListItems = await BucketListItem.find();
        if (!bucketListItems) throw new Error('No bucketListItems');
        const sorted = bucketListItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const newBucketListItem = new BucketListItem(req.body);
    try {
        const bucketListItem = await newBucketListItem.save();
        if (!bucketListItem) throw new Error('Something went wrong when saving the new bucketListItem');
        res.status(201).json(bucketListItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await BucketListItem.findByIdAndUpdate(id, req.body);
        if (!response) throw new Error('Something went wrong when updating the bucketListItem');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await BucketListItem.findByIdAndDelete(id);
        if (!removed) throw new Error('Something went wrong when deleting the bucketListItem');
        res.status(204).json(removed);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;