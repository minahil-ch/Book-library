import { Link } from 'react-router-dom';

const Sidebar = ({ books, activePath }) => {
  const total = books.length;
  const read = books.filter(b => b.status === 'read').length;
  const reading = books.filter(b => b.status === 'reading').length;
  const lent = books.filter(b => b.status === 'lent').length;

  return (
    <nav id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">Minahil</div>
        <div className="logo-sub">Personal Library</div>
      </div>
      <div className="sidebar-stats">
        <div className="stat-pill"><div className="n">{total}</div><div className="l">Books</div></div>
        <div className="stat-pill"><div className="n">{read}</div><div className="l">Read</div></div>
        <div className="stat-pill"><div className="n">{reading}</div><div className="l">Reading</div></div>
        <div className="stat-pill"><div className="n">{lent}</div><div className="l">Lent Out</div></div>
      </div>
      <div className="sidebar-nav">
        <div className="nav-section-label">Library</div>
        <Link to="/" className={`nav-item ${activePath === '/' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          All Books
          <span className="nav-badge">{total}</span>
        </Link>
        <Link to="/reading" className={`nav-item ${activePath === '/reading' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          Currently Reading
        </Link>
        <Link to="/wishlist" className={`nav-item ${activePath === '/wishlist' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          Want to Read
        </Link>
        <Link to="/lent" className={`nav-item ${activePath === '/lent' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          Lent Out
        </Link>
        <div className="nav-section-label">Insights</div>
        <Link to="/history" className={`nav-item ${activePath === '/history' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Activity
        </Link>
        <Link to="/stats" className={`nav-item ${activePath === '/stats' ? 'active' : ''}`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          Statistics
        </Link>
      </div>
      <div className="sidebar-footer">© 2026 Folio</div>
    </nav>
  );
};

export default Sidebar;
