import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [repositories, setRepositories] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      setUserDetails(userData);

      const repositoriesResponse = await fetch(userData.repos_url);
      const repositoriesData = await repositoriesResponse.json();
      setRepositories(repositoriesData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserDetails();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Go!</button>
      </form>

      {userDetails && (
        <div>
          <img src={userDetails.avatar_url} alt="User Avatar" />
          <h2>Name: {userDetails.name}</h2>
          <p>Location: {userDetails.location}</p>
          <p>Bio: {userDetails.bio}</p>
        </div>
      )}

      {repositories && (
        <div>
          <h3>Repositories:</h3>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;