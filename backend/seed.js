const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const Activity = require('./models/Activity');

dotenv.config();

const sampleBooks = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction", status: "read", rating: 4, coverColor: 0 },
  { title: "Sapiens", author: "Yuval Noah Harari", year: 2011, genre: "Non-Fiction", status: "read", rating: 5, coverColor: 1 },
  { title: "Dune", author: "Frank Herbert", year: 1965, genre: "Sci-Fi", status: "reading", rating: 5, coverColor: 2 },
  { title: "Gone Girl", author: "Gillian Flynn", year: 2012, genre: "Mystery", status: "lent", lentTo: "Emma", rating: 4, coverColor: 3 },
  { title: "Educated", author: "Tara Westover", year: 2018, genre: "Biography", status: "read", rating: 5, coverColor: 4 },
  { title: "1984", author: "George Orwell", year: 1949, genre: "Fiction", status: "read", rating: 5, coverColor: 5 },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", year: 2007, genre: "Fiction", status: "want", coverColor: 6 },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: 2011, genre: "Non-Fiction", status: "want", coverColor: 7 },
  { title: "The Silk Roads", author: "Peter Frankopan", year: 2015, genre: "History", status: "reading", rating: 4, coverColor: 8 },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", year: 2005, genre: "Mystery", status: "read", rating: 4, coverColor: 9 }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/folio')
.then(async () => {
  console.log('MongoDB connected for seeding');
  
  await Book.deleteMany({});
  await Activity.deleteMany({});
  
  for (let bookData of sampleBooks) {
    const book = new Book(bookData);
    await book.save();
    await Activity.create({
      type: 'added',
      bookId: book._id,
      title: book.title,
      description: 'Added to library from initial seed'
    });
  }
  
  console.log('Database seeded with sample books');
  process.exit();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
