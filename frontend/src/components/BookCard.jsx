const BookCard = ({ book, onClick }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i=1; i<=5; i++) {
      stars.push(<span key={i} className={`star ${i <= (rating||0) ? '' : 'empty'}`}>★</span>);
    }
    return stars;
  };

  const getStatusBadge = () => {
    switch (book.status) {
      case 'read': return <div className="book-status-badge status-read">✓ Read</div>;
      case 'reading': return <div className="book-status-badge status-reading">👁 Reading</div>;
      case 'want': return <div className="book-status-badge status-want">🔖 Want</div>;
      case 'lent': return <div className="book-status-badge status-lent">↗ Lent</div>;
      default: return null;
    }
  };

  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <div className={`book-spine bc-${book.coverColor || 0}`}>
        {getStatusBadge()}
        <div className="spine-content">
          <div className="spine-title">{book.title}</div>
          <div className="spine-author">{book.author}</div>
        </div>
      </div>
      <div className="book-card-info">
        <div className="card-title">{book.title}</div>
        <div className="card-author">{book.author}</div>
        <div className="card-rating">{renderStars(book.rating)}</div>
      </div>
    </div>
  );
};

export default BookCard;
