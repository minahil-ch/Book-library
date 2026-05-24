const Statistics = ({ books }) => {
  const total = books.length;
  const read = books.filter(b => b.status === 'read').length;
  const pages = books.reduce((sum, b) => sum + (Number(b.pages) || 0), 0);
  const avgRating = books.filter(b => b.rating).length > 0 
    ? (books.filter(b => b.rating).reduce((sum, b) => sum + b.rating, 0) / books.filter(b => b.rating).length).toFixed(1)
    : 0;

  const genres = {};
  books.forEach(b => {
    const g = b.genre || 'Other';
    genres[g] = (genres[g] || 0) + 1;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Statistics</h1>
        <p className="page-subtitle">Insights into your reading habits</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="big-number">{total}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="big-number">{read}</div>
          <div className="stat-label">Books Read</div>
        </div>
        <div className="stat-card">
          <div className="big-number">{pages}</div>
          <div className="stat-label">Pages Read</div>
        </div>
        <div className="stat-card">
          <div className="big-number">{avgRating}</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>
      <div className="genre-bar-section">
        <div className="genre-bar-title">Books by Genre</div>
        {Object.entries(genres).map(([g, count]) => (
          <div key={g} className="genre-bar-row">
            <div className="genre-bar-label">{g}</div>
            <div className="genre-bar-track">
              <div className="genre-bar-fill" style={{width: `${(count/total)*100}%`, background: 'var(--gold)'}}></div>
            </div>
            <div className="genre-bar-count">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
