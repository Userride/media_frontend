// components/ErrorPage.js

import React from 'react';

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>404 - Page Not Found</h2>
      <p style={styles.message}>Only admins can view this page. Please login as admin.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    color: '#FF5733', 
  },
  message: {
    color: '#555',
  },
};

export default ErrorPage;
