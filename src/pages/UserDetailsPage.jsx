import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetailsPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        if (userData.message) {
          setError(userData.message);
          setLoading(false);
          return;
        }

        setUserDetails(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (err) {
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{userDetails.name || username}'s Details</h1>

      <div>
        <img
          src={userDetails.avatar_url}
          alt={userDetails.login}
          style={{ width: '100px', borderRadius: '50%', marginBottom: '1rem' }}
        />
        <p><strong>Username:</strong> {userDetails.login}</p>
        <p><strong>Bio:</strong> {userDetails.bio || 'No bio available'}</p>
        <p><strong>Location:</strong> {userDetails.location || 'Not specified'}</p>
        <p><strong>Followers:</strong> {userDetails.followers}</p>
        <p><strong>Following:</strong> {userDetails.following}</p>
        <p><strong>Public Repositories:</strong> {userDetails.public_repos}</p>
      </div>

      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1rem',
          padding: '8px 12px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Search
      </button>

    </div>
  );
}

export default UserDetailsPage;
