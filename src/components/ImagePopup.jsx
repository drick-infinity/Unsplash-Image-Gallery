import { useState, useEffect } from 'react';
import axios from 'axios';

function ImagePopup() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_KEY ='gxNAXkZxFmaQK_RtweYJH-MxM8k1zj87w9PBDOVAR24';

  useEffect(() => {
    // Fetch images from the Unsplash API
    axios.get('https://api.unsplash.com/photos', {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    })
    .then(response => {
      setImages(response.data);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="image-grid">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            onClick={() => openModal(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedImage.user.name}</h2>
            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
            {/* Add other image details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
