import React from 'react';

const ImageCollection = ({ images }) => {
  const handleImageClick = (image) => {
    window.open(image, '_blank');
  };

  return (
    <div style={styles.container}>
      <h2>All User Images</h2>
      <div style={styles.grid}>
        {images.map((image, index) => (
          <div key={index} style={styles.imageWrapper}>
            <img src={image} alt={`UserImage-${index}`} style={styles.image} />
            <button onClick={() => handleImageClick(image)} style={styles.button}>
              View Full Image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  imageWrapper: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover', 
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ImageCollection;
