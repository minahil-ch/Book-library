import { useState, useEffect } from 'react';
import api from '../api';

export const BookDetailModal = ({ book, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ ...book });

  useEffect(() => {
    setFormData({ ...book });
  }, [book]);

  if (!isOpen || !book) return null;

  const handleSave = async () => {
    try {
      const res = await api.put(`/books/${book._id}`, formData);
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${book._id}`);
        onDelete(book._id);
        onClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.className === 'modal-overlay open') onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className={`modal-cover bc-${formData.coverColor || 0}`}></div>
          <div>
            <h2 className="modal-book-title">{formData.title}</h2>
            <p className="modal-book-author">{formData.author}</p>
            <div className="modal-book-meta">
              {formData.genre && <span className="modal-tag">{formData.genre}</span>}
              {formData.year && <span className="modal-tag">{formData.year}</span>}
              {formData.pages && <span className="modal-tag">{formData.pages} pages</span>}
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">Status</div>
            <div className="status-select-row">
              <button className={`status-btn ${formData.status === 'read' ? 'active-read' : ''}`} onClick={() => setFormData({...formData, status: 'read'})}>✓ Read</button>
              <button className={`status-btn ${formData.status === 'reading' ? 'active-reading' : ''}`} onClick={() => setFormData({...formData, status: 'reading'})}>👁 Reading</button>
              <button className={`status-btn ${formData.status === 'want' ? 'active-want' : ''}`} onClick={() => setFormData({...formData, status: 'want'})}>🔖 Want to Read</button>
              <button className={`status-btn ${formData.status === 'lent' ? 'active-lent' : ''}`} onClick={() => setFormData({...formData, status: 'lent'})}>↗ Lent Out</button>
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">My Rating</div>
            <div className="star-rating">
              {[1,2,3,4,5].map(r => (
                <button key={r} className={`star-btn ${r <= (formData.rating || 0) ? 'lit' : ''}`} onClick={() => setFormData({...formData, rating: r})}>★</button>
              ))}
            </div>
          </div>
          {formData.description && (
            <div className="modal-section">
              <div className="modal-section-title">Description</div>
              <p>{formData.description}</p>
            </div>
          )}
          <div className="modal-section">
            <div className="modal-section-title">My Notes</div>
            <textarea className="notes-area" placeholder="Add personal notes, quotes, or thoughts…" value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
          </div>
          {formData.status === 'lent' && (
            <div className="modal-section">
              <div className="modal-section-title">Lending Info</div>
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <input type="text" placeholder="Borrower's name" style={{flex:1, padding:'9px 12px', border:'1.5px solid var(--border-strong)', borderRadius:'9px', fontFamily:'DM Sans', fontSize:'14px', outline:'none', background:'var(--cream)'}} value={formData.lentTo || ''} onChange={(e) => setFormData({...formData, lentTo: e.target.value})} />
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export const AddBookModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ title: '', author: '', year: '', genre: 'Fiction', pages: '', description: '', status: 'want' });

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!formData.title || !formData.author) {
      alert("Title and Author are required");
      return;
    }
    try {
      const res = await api.post('/books', formData);
      onAdd(res.data);
      setFormData({ title: '', author: '', year: '', genre: 'Fiction', pages: '', description: '', status: 'want' });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.className === 'modal-overlay open') onClose(); }}>
      <div className="modal">
        <div className="modal-header" style={{padding:'24px 32px'}}>
          <div>
            <h2 className="modal-book-title">Add New Book</h2>
            <p className="modal-book-author" style={{marginTop:'4px'}}>Expand your library</p>
          </div>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group form-full">
              <label>Title *</label>
              <input type="text" placeholder="Book title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input type="text" placeholder="Author name" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" placeholder="Publication year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <select value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pages</label>
              <input type="number" placeholder="Number of pages" value={formData.pages} onChange={e => setFormData({...formData, pages: e.target.value})} />
            </div>
            <div className="form-group form-full">
              <label>Description</label>
              <textarea placeholder="Brief description or synopsis…" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div className="form-group form-full">
              <label>Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="want">Want to Read</option>
                <option value="reading">Currently Reading</option>
                <option value="read">Read</option>
                <option value="lent">Lent Out</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Add Book</button>
        </div>
      </div>
    </div>
  );
};
