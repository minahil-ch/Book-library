import { useState, useEffect } from 'react';
import api from '../api';

export const BookDetailModal = ({ book, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ 
    title: '', author: '', year: '', genre: 'Fiction', pages: '', description: '', status: 'want', coverImage: '', rating: 0, notes: '', lentTo: '' 
  });

  useEffect(() => {
    if (book) {
      setFormData({ 
        ...book,
        year: book.year || '',
        pages: book.pages || '',
        description: book.description || '',
        notes: book.notes || '',
        coverImage: book.coverImage || '',
        lentTo: book.lentTo || ''
      });
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.author?.trim()) {
      alert("Title and Author are required");
      return;
    }
    try {
      const payload = { 
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        year: formData.year && !isNaN(parseInt(formData.year)) ? parseInt(formData.year) : undefined,
        pages: formData.pages && !isNaN(parseInt(formData.pages)) ? parseInt(formData.pages) : undefined,
        description: formData.description?.trim(),
        coverImage: formData.coverImage?.trim(),
        notes: formData.notes?.trim(),
        lentTo: formData.status === 'lent' ? formData.lentTo?.trim() : undefined
      };
      
      // Clean up internal fields and empty values
      const internalFields = ['_id', 'createdAt', 'updatedAt', '__v'];
      Object.keys(payload).forEach(key => {
        if (internalFields.includes(key) || payload[key] === '' || payload[key] === undefined) {
          delete payload[key];
        }
      });

      const res = await api.put(`/books/${book._id}`, payload);
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error('Error saving book:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to save changes. Please try again.';
      alert(errorMsg);
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
          <div className={`modal-cover bc-${formData.coverColor || 0}`}>
            {formData.coverImage && <img src={formData.coverImage} alt={formData.title} />}
          </div>
          <div style={{flex: 1}}>
            <div className="form-group" style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                className="modal-book-title" 
                style={{width: '100%', background: 'transparent', border: 'none', padding: 0}}
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                placeholder="Title"
              />
              <input 
                type="text" 
                className="modal-book-author" 
                style={{width: '100%', background: 'transparent', border: 'none', padding: 0, marginTop: '4px'}}
                value={formData.author} 
                onChange={e => setFormData({...formData, author: e.target.value})} 
                placeholder="Author"
              />
            </div>
            <div className="modal-book-meta">
              <select 
                className="modal-tag" 
                style={{background: 'transparent', cursor: 'pointer', outline: 'none'}}
                value={formData.genre} 
                onChange={e => setFormData({...formData, genre: e.target.value})}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              <input 
                type="number" 
                className="modal-tag" 
                style={{width: '70px', background: 'transparent', outline: 'none'}}
                placeholder="Year"
                value={formData.year} 
                onChange={e => setFormData({...formData, year: e.target.value})}
              />
              <input 
                type="number" 
                className="modal-tag" 
                style={{width: '90px', background: 'transparent', outline: 'none'}}
                placeholder="Pages"
                value={formData.pages} 
                onChange={e => setFormData({...formData, pages: e.target.value})}
              />
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">Status</div>
            <div className="status-select-row">
              <button type="button" className={`status-btn ${formData.status === 'read' ? 'active-read' : ''}`} onClick={() => setFormData({...formData, status: 'read'})}>✓ Read</button>
              <button type="button" className={`status-btn ${formData.status === 'reading' ? 'active-reading' : ''}`} onClick={() => setFormData({...formData, status: 'reading'})}>👁 Reading</button>
              <button type="button" className={`status-btn ${formData.status === 'want' ? 'active-want' : ''}`} onClick={() => setFormData({...formData, status: 'want'})}>🔖 Want to Read</button>
              <button type="button" className={`status-btn ${formData.status === 'lent' ? 'active-lent' : ''}`} onClick={() => setFormData({...formData, status: 'lent'})}>↗ Lent Out</button>
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">My Rating</div>
            <div className="star-rating">
              {[1,2,3,4,5].map(r => (
                <button key={r} type="button" className={`star-btn ${r <= (formData.rating || 0) ? 'lit' : ''}`} onClick={() => setFormData({...formData, rating: r})}>★</button>
              ))}
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">Description</div>
            <textarea 
              className="notes-area" 
              placeholder="Brief description or synopsis…" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">My Notes</div>
            <textarea className="notes-area" placeholder="Add personal notes, quotes, or thoughts…" value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
          </div>
          <div className="modal-section">
            <div className="modal-section-title">Cover Image URL</div>
            <input type="text" className="notes-area" style={{minHeight: '40px'}} placeholder="https://example.com/image.jpg" value={formData.coverImage || ''} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} />
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
  const [formData, setFormData] = useState({ title: '', author: '', year: '', genre: 'Fiction', pages: '', description: '', status: 'want', coverImage: '' });

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.author?.trim()) {
      alert("Title and Author are required");
      return;
    }
    try {
      const payload = { 
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        year: formData.year && !isNaN(parseInt(formData.year)) ? parseInt(formData.year) : undefined,
        pages: formData.pages && !isNaN(parseInt(formData.pages)) ? parseInt(formData.pages) : undefined,
        description: formData.description?.trim(),
        coverImage: formData.coverImage?.trim(),
        lentTo: formData.status === 'lent' ? formData.lentTo?.trim() : undefined
      };
      
      // Clean up empty fields
      Object.keys(payload).forEach(key => {
        if (payload[key] === '' || payload[key] === undefined) {
          delete payload[key];
        }
      });

      const res = await api.post('/books', payload);
      onAdd(res.data);
      setFormData({ title: '', author: '', year: '', genre: 'Fiction', pages: '', description: '', status: 'want', coverImage: '', lentTo: '' });
      onClose();
    } catch (err) {
      console.error('Error adding book:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to add book. Please try again.';
      alert(errorMsg);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.className === 'modal-overlay open') onClose(); }}>
      <div className="modal">
        <div className="modal-header" style={{padding:'24px 32px', display: 'flex', gap: '20px'}}>
          {formData.coverImage && (
            <div className="modal-cover bc-0">
              <img src={formData.coverImage} alt="Preview" />
            </div>
          )}
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
                <option value="Education">Education</option>
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
              <label>Cover Image URL</label>
              <input type="text" placeholder="https://example.com/image.jpg" value={formData.coverImage || ''} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
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
            {formData.status === 'lent' && (
              <div className="form-group form-full">
                <label>Lent To</label>
                <input type="text" placeholder="Borrower's name" value={formData.lentTo || ''} onChange={e => setFormData({...formData, lentTo: e.target.value})} />
              </div>
            )}
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
