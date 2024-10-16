import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ImageCollection from './components/ImageCollection';
import ErrorPage from './components/ErrorPage';

function App() {
  const [images, setImages] = useState([]);
  const [islogin, setislogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setislogin(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div>
        {/* Header */}
        <header className="shadow sticky top-0 z-50">
          <nav style={styles.navbar}>
            <div style={styles.navContainer}>
              <div style={styles.brand}>
                <NavLink to="/" style={styles.brandLink}>Home</NavLink>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                onClick={toggleMenu}
                style={styles.menuButton}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              {/* Full Navbar - Links (hidden on small screens) */}
              <div className={`${isOpen ? 'block' : 'hidden'} lg:flex`} id="mobile-menu" style={styles.fullNavbar}>
                <ul style={styles.navList}>
                  
                  {/* Additional nav items can go here */}
                </ul>
              </div>

              {/* Right Side: Login/Logout */}
              <div style={styles.authSection}>
                {!localStorage.getItem("authToken") ? (
                  <>
                    <Link to="/admin/login" style={styles.authButton}>
                      Admin_Login
                    </Link>
                  </>
                ) : (
                  <button style={styles.authButton} onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin/login" element={<AdminLogin setislogin={setislogin} />} />
          <Route path="/admin/dashboard" element={islogin ? <AdminDashboard setimages={setImages} islogin={islogin} setislogin={setislogin} /> : <ErrorPage />} />
          <Route path="/user/images" element={<ImageCollection images={images} />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#f0f0f0',
    padding: '20px 30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  brand: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  brandLink: {
    color: '#f97316',
    textDecoration: 'none',
  },
  menuButton: {
    display: 'block',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  fullNavbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    padding: '10px 15px',
    textDecoration: 'none',
    fontSize: '18px',
    color: '#4CAF50',
    transition: 'color 0.3s',
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
  },
  authButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    borderRadius: '8px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default App;
