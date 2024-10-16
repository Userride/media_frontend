import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [Username, setUserName] = useState('');
  const [SocialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const formData = new FormData();
    formData.append('Username', Username);
    formData.append('SocialHandle', SocialHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('https://media-backend-pjhz.onrender.com/admin_dashboard/v1/user/Upload', formData);
      console.log(response.data);
      setUserName('');
      setSocialHandle('');
      setImages([]);
      setMessage('Files uploaded successfully!');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form', error);
      setMessage(error.response?.data?.message || 'An error occurred during submission.');
    } finally {
      setLoading(false); 
    }
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} style={styles.imageContainer}>
        <img src={URL.createObjectURL(image)} alt="Preview" width="100" height="100" />
        <button onClick={() => handleRemoveImage(index)} style={styles.deleteButton}>Remove</button>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <h2>Submit User Information</h2>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input type="text" value={Username} onChange={(e) => setUserName(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Social Handle:</label>
            <input type="text" value={SocialHandle} onChange={(e) => setSocialHandle(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Upload Images:</label>
            <input type="file" multiple onChange={handleImageChange} required style={styles.input} />
          </div>
          <div>
            <h3>Selected Images Preview:</h3>
            <div style={styles.imagesPreview}>
              {renderImages()}
            </div>
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'} 
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#557674',
  },
  card: {
    backgroundColor: 'rgb(105, 154, 149)',
    padding: '65px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    opacity: (loading) => loading ? '0.6' : '1', 
  },
  imagesPreview: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageContainer: {
    display: 'inline-block',
    position: 'relative',
    margin: '10px',
  },
  deleteButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '2px 5px',
  },
  message: {
    marginTop: '15px',
    color: 'black',
    fontWeight: 'bold',
  },
};

export default UserForm;
