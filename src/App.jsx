import React, { useState, useEffect } from 'react';

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const App = () => {
  const [bgColor, setBgColor] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      const randomUser = data.users[Math.floor(Math.random() * data.users.length)];

      setUserData(randomUser);
      setBgColor(getRandomColor());
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRefreshClick = () => fetchRandomUser();

  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <div style={{ height: '400px', width: '700px' }}>
      <h1 style={{ textAlign: 'center' }}>
        Random User On Refresh
      </h1>
      <div style={{ backgroundColor: bgColor, padding: '20px', height: '80vh' }}>
        <div className='row'>
          <div className='col-6'>
            <img
              style={{ width: '200px', height: '200px' }}
              src={userData?.image || ''}
              alt='Profile'
            />

            <div className='d-flex justify-content-between mt-5'>
              <h4>Birth Date: {userData?.birthDate || 'N/A'}</h4>
              <h4>Age: {userData?.age || 'N/A'}</h4>
            </div>
            <div>
              <h4>Weight: {userData?.weight || 'N/A'}</h4>
              <h4>Height: {userData?.height || 'N/A'}</h4>
            </div>

          </div>
          <div>
            <div>
              <h4>Home Address: {userData?.address?.address || 'N/A'}</h4>
              <h4>Mobile Phone: {userData?.phone || 'N/A'}</h4>
              <h4>Company: {userData?.company?.name || 'N/A'}</h4>
              <h4>Job Title: {userData?.company?.title || 'N/A'}</h4>
              <h4>Email: {userData?.email || 'N/A'}</h4>
            </div>
            <button
              onClick={handleRefreshClick}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;