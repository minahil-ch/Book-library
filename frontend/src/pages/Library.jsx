import { useState } from 'react';
import BookCard from '../components/BookCard';
import BookListRow from '../components/BookListRow';
import { BookDetailModal, AddBookModal } from '../components/Modal';

const Library = ({ books, fetchBooks, fetchActivities, showToast, layout, searchQuery, sortMethod, isAddModalOpen, setIsAddModalOpen, filterStatus }) => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getPageTitles = () => {
    switch (filterStatus) {
      case 'reading': return { title: 'Currently Reading', sub: 'Books you are enjoying right now' };
      case 'want': return { title: 'Want to Read', sub: 'Your reading wishlist' };
      case 'lent': return { title: 'Lent Out', sub: 'Books borrowed by friends' };
      default: return { title: 'All Books', sub: 'Your complete collection' };
    }
  };

  const { title, sub } = getPageTitles();

  let filtered = books;
  if (filterStatus !== 'all') {
    filtered = filtered.filter(b => b.status === filterStatus);
  }
  if (activeGenre !== 'all') {
    filtered = filtered.filter(b => b.genre === activeGenre);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.author.toLowerCase().includes(q) || 
      (b.genre && b.genre.toLowerCase().includes(q))
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortMethod === 'title') return a.title.localeCompare(b.title);
    if (sortMethod === 'author') return a.author.localeCompare(b.author);
    if (sortMethod === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortMethod === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleSaveBook = (updatedBook) => {
    showToast('Book updated successfully');
    fetchBooks();
    fetchActivities();
  };

  const handleDeleteBook = (id) => {
    showToast('Book deleted');
    fetchBooks();
    fetchActivities();
  };

  const handleAddBook = (newBook) => {
    showToast('Book added successfully');
    fetchBooks();
    fetchActivities();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{sub}</p>
      </div>
      
      <div className="filter-row">
        <button className={`chip ${activeGenre === 'all' ? 'active' : ''}`} onClick={() => setActiveGenre('all')}>All</button>
        {['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Biography', 'History'].map(g => (
          <button 
            key={g} 
            className={`chip genre-${g.toLowerCase()} ${activeGenre === g ? 'active' : ''}`}
            onClick={() => setActiveGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No books found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        layout === 'grid' ? (
          <div id="books-grid">
            {sorted.map(b => <BookCard key={b._id} book={b} onClick={handleBookClick} />)}
          </div>
        ) : (
          <div id="books-list" className="active">
            {sorted.map(b => <BookListRow key={b._id} book={b} onClick={handleBookClick} />)}
          </div>
        )
      )}

      <BookDetailModal 
        book={selectedBook} 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        onSave={handleSaveBook}
        onDelete={handleDeleteBook}
      />

      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddBook} 
      />
    </div>
  );
};

export default Library;
