const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: { type: String, enum: ['added', 'started', 'finished', 'borrowed', 'returned'], required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
