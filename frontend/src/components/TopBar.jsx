const TopBar = ({ viewLayout, setViewLayout, searchQuery, setSearchQuery, sortMethod, setSortMethod, onAddClick }) => {
  return (
    <header id="topbar">
      <div className="search-wrap">
        <svg className="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input 
          type="text" 
          placeholder="Search books, authors, genres…" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="view-toggle">
        <button className={`view-btn ${viewLayout === 'grid' ? 'active' : ''}`} onClick={() => setViewLayout('grid')} title="Grid view">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"/></svg>
        </button>
        <button className={`view-btn ${viewLayout === 'list' ? 'active' : ''}`} onClick={() => setViewLayout('list')} title="List view">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <select className="sort-select" value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
        <option value="title">Sort: Title</option>
        <option value="author">Sort: Author</option>
        <option value="date">Sort: Recently Added</option>
        <option value="rating">Sort: Rating</option>
      </select>
      <button className="add-btn" onClick={onAddClick}>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        Add Book
      </button>
    </header>
  );
};

export default TopBar;
