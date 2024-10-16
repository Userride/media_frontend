import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from './ErrorPage';
import { io } from 'socket.io-client';

const AdminDashboard = ({ setimages, islogin, setislogin }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const socket = io('https://media-backend-pjhz.onrender.com');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://media-backend-pjhz.onrender.com/admin_dashboard/v1/user/getall');
      console.log('Fetched users:', response.data.data); 
      setUsers(response.data.data); 
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    socket.on('newUser', (newUser) => {
      console.log('New user added via socket:', newUser);
      fetchUsers(); 
    });

    return () => {
      socket.off('newUser');
    };
  }, []);

  const handleViewAllImages = (userImages) => {
    setimages(userImages);
    navigate('/user/images');
  };

  const handleLogout = () => {
    setislogin(false);  
    navigate('/');  
  };

  return (
    <>
      {!islogin ? <ErrorPage /> : 
        <div style={styles.container}>
          <div style={styles.navbar}>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
          
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Social Handle</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.Username}</td>
                  <td>{user.SocialHandle}</td>
                  <td>
                    <div style={styles.imageContainer}>
                      {user.images.slice(0, 3).map((img, idx) => (
                        <img key={idx} src={img} alt="User" style={styles.image} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => handleViewAllImages(user.images)} style={styles.button}>
                      View All Images
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  );
};

const styles = {
  container: {
    backgroundColor: '#2a5e5a', // Body background color
    minHeight: '100vh',
    padding: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    backgroundColor: '#2a5e5a',
    
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: 'rgb(105, 154, 149)', // Table background color
    color: '#fff', // Table text color for contrast
    borderRadius: '10px',
    overflow: 'hidden',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  th: {
    padding: '10px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px 15px',
    textAlign: 'left',
  },
};

export default AdminDashboard;
