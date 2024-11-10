import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext'; // Or Redux if using Redux Toolkit
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
  const { user, logout } = useContext(AuthContext); // Replace with Redux if applicable
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users); // `users` is the array from the API response
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="content">
        <section className="info-section">
          <h2>User List</h2>
          <p>Below is a list of users fetched from the DummyJSON API.</p>
        </section>
        <section className="cards-section">
          {users.length > 0 ? (
            users.map((userData) => (
              <div key={userData.id} className="card">
                <img
                  src={userData.image || 'https://via.placeholder.com/150'}
                  alt={userData.firstName}
                />
                <h3>
                  {userData.firstName} {userData.lastName}
                </h3>
                <p>Email: {userData.email}</p>
                <p>Age: {userData.age}</p>
                <p>Address: {userData.address.city}, {userData.address.state}</p>
              </div>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
