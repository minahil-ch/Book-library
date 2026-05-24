import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Library from './pages/Library';
import Activity from './pages/Activity';
import Statistics from './pages/Statistics';
import Toast from './components/Toast';
import api from './api';

function App() {
  const [books, setBooks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [viewLayout, setViewLayout] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('title');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchBooks();
    fetchActivities();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await api.get('/activities');
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  return (
    <>
      <Sidebar books={books} activePath={location.pathname} />
      <div id="main">
        <TopBar 
          viewLayout={viewLayout} 
          setViewLayout={setViewLayout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          onAddClick={() => setIsAddModalOpen(true)}
        />
        <div id="content">
          <Routes>
            <Route path="/" element={<Library books={books} fetchBooks={fetchBooks} fetchActivities={fetchActivities} showToast={showToast} layout={viewLayout} searchQuery={searchQuery} sortMethod={sortMethod} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} filterStatus="all" />} />
            <Route path="/reading" element={<Library books={books} fetchBooks={fetchBooks} fetchActivities={fetchActivities} showToast={showToast} layout={viewLayout} searchQuery={searchQuery} sortMethod={sortMethod} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} filterStatus="reading" />} />
            <Route path="/wishlist" element={<Library books={books} fetchBooks={fetchBooks} fetchActivities={fetchActivities} showToast={showToast} layout={viewLayout} searchQuery={searchQuery} sortMethod={sortMethod} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} filterStatus="want" />} />
            <Route path="/lent" element={<Library books={books} fetchBooks={fetchBooks} fetchActivities={fetchActivities} showToast={showToast} layout={viewLayout} searchQuery={searchQuery} sortMethod={sortMethod} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} filterStatus="lent" />} />
            <Route path="/history" element={<Activity activities={activities} />} />
            <Route path="/stats" element={<Statistics books={books} />} />
          </Routes>
        </div>
      </div>
      <Toast message={toastMessage} visible={toastVisible} />
    </>
  );
}

export default App;
