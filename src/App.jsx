import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleTheme } from './redux/themeSlice';

import SearchPage from './pages/SearchPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <button 
        onClick={() => dispatch(toggleTheme())}
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          padding: '8px 12px',
          background: theme === 'dark' ? '#444' : '#ddd',
          color: theme === 'dark' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
