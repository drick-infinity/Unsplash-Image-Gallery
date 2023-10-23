import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  
  const API_Key ='gxNAXkZxFmaQK_RtweYJH-MxM8k1zj87w9PBDOVAR24';

  useEffect(() => {
    axios.get('https://api.unsplash.com/photos', {
    headers: {
  Authorization: `Client-ID ${API_Key}`,
},params: {
          page: page,
        },
    })
    .then((response) => {
      setPhotos((prevPhotos)=>[...prevPhotos, ...response.data]);
    })
    .catch((error) => {
      console.error('Error fetching photos:', error);
    });
  }, [page]);

   const loadMore = () => {
    setPage(page + 1);
  };
  return ( 
    <div className='images '>
      
    <div className='image-card'>
      <ul className='image-card-row'>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} className='image'/>
            <p className='image-card__user'>Username: {photo.user.username}</p>
             <img
              src={photo.user.profile_image.small}
              alt={`Profile image of ${photo.user.username}`} className='image-card__user-image'/>
            <p className='image-card__likes'>Likes: {photo.likes}</p> 
          </div>
        ))}
      </ul>
      <div className='buttons'>
       <Button className='hovered' onClick={loadMore}>Load More</Button>
      </div>
      </div>
      </div>
     
  );
};
 
export default PhotoList;