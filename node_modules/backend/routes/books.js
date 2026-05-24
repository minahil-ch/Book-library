const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Activity = require('../models/Activity');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  console.log('POST /api/books - Body:', req.body);
  try {
    const coverColor = Math.floor(Math.random() * 10);
    const newBook = new Book({ ...req.body, coverColor });
    const savedBook = await newBook.save();
    console.log('Book saved:', savedBook._id);
    
    // Log activity
    await Activity.create({
      type: 'added',
      bookId: savedBook._id,
      title: savedBook.title,
      description: `Added to library`
    });
    console.log('Activity logged');

    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const oldBook = await Book.findById(req.params.id);
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (oldBook.status !== updatedBook.status) {
      let activityType = '';
      let desc = '';
      if (updatedBook.status === 'reading') {
        activityType = 'started';
        desc = 'Started reading';
      } else if (updatedBook.status === 'read') {
        activityType = 'finished';
        desc = 'Finished reading';
      } else if (updatedBook.status === 'lent') {
        activityType = 'borrowed';
        desc = `Lent to ${updatedBook.lentTo || 'someone'}`;
      } else if (oldBook.status === 'lent' && updatedBook.status !== 'lent') {
        activityType = 'returned';
        desc = 'Returned to library';
      }

      if (activityType) {
        await Activity.create({
          type: activityType,
          bookId: updatedBook._id,
          title: updatedBook.title,
          description: desc
        });
      }
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    await Activity.deleteMany({ bookId: req.params.id });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
