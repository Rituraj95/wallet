import React, { useState } from 'react';
import LoginPage from './login';
import MergePage from './components/merge';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null); // To track the logged-in user

  // Handle login
  const handleLogin = (user) => {
    setLoggedInUser(user); // Set the logged-in user details
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedInUser(null); // Clear user details to show the login page again
  };

  return (
    <div>
      {loggedInUser ? (
        <MergePage user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
