import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [apiFetchCount, setApiFetchCount] = useState(0); 

  const navigate = useNavigate();

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    setApiFetchCount(prev => prev + 1); 

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=30&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.items) {
        setUsers(data.items);
        setTotalUsers(data.total_count);
        setTotalPages(Math.ceil(data.total_count / 30));
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }

    setLoading(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setPage(1);
    fetchUsers(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const goToUser = (username) => {
    navigate(`/user/${username}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      fetchUsers(newPage);
    }
  };

  return (
    <div style={{ padding: '2rem'}}>
      <h1 style={{textAlign: 'center'}} className='p-8' >Search Github</h1>
      <div className="input-box" style={{textAlign: 'center'}}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter username"
          style={{ padding: '0.5rem', width: '20rem' }}
          />
        <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem' }}>
          Search
        </button>
      </div>

      {loading && <p style={{textAlign: "center"}} >Loading...</p>}

      {/* API Fetch Counter */}
      {/* <p style={{ marginTop: '1rem' }}>
        API fetch - {String(apiFetchCount).padStart(2, '0')}
      </p> */}

      <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent:'center', gap: '2rem'}}>
        {users.map((user) => (
          <div
            key={user.login}
            onClick={() => goToUser(user.login)}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '1rem',
              width: '20rem'
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ width: '5rem', height: '5rem', borderRadius: '50%', marginRight: '1rem' }}
            />
            <span>{user.login}</span>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            style={{ padding: '0.5rem', marginRight: '1rem' }}
          >
            Previous
          </button>
          <span>{page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            style={{ padding: '0.5rem', marginLeft: '1rem' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
