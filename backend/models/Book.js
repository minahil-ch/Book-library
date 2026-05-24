const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  genre: { type: String },
  pages: { type: Number },
  description: { type: String },
  status: { type: String, enum: ['read', 'reading', 'want', 'lent'], default: 'want' },
  rating: { type: Number, min: 1, max: 5 },
  coverColor: { type: Number, default: 0 },
  notes: { type: String },
  lentTo: { type: String },
  lentDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
