import {useState, useRef, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './index.css';
import PhotoList from './components/PhotoList';
import DarkModeToggle from './components/DarkModeToggle';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 18;

function App() {
  const searchInput = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
 
  const fetchImages = async () => {
     try{
      if(searchQuery){
          setErrorMsg('');
          const {data} = await axios.get(`${API_URL}?query=${searchQuery}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`);
          setImages(data.results);
        }
      }catch(error){
        setErrorMsg('Error fetching images. Try again later')
        console.log(error);
      }
    };
    const resetSearch = () =>{
      fetchImages();
      setPage(1);
    }
    
    useEffect(() =>{
     fetchImages();
    },[page, searchQuery]);
    
    const handleSearch = (event) =>{
    event.preventDefault();
    const searchTerm = searchInput.current.value;
    setSearchQuery(searchTerm);
     resetSearch();
  };

  const handleSelection = (selection) =>{
      searchInput.current.value = selection;
      setSearchQuery(selection);
      resetSearch();
  };
 const Next = () => {
    setPage(page + 1);
  };

return (<div className='container'>
     
  <nav><div className="navbar">
  <h1 className='title'>Image Gallery</h1>
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
         <Form onSubmit={handleSearch} className='search-section'>
        <Form.Control type='search' placeholder='Type something to search...' className='search-input' ref={searchInput}/>
      </Form>
            <ul type="none" className='filters'>
                <li>
                    <a  href="#">Explore</a>
                </li>
                <li >
                    <a href="#">Collection</a>
                </li>
                <li>
                    <a href="#">Community</a>
                </li>
                <div>
                <li>
                   <label className="switch">
                    <input  type="checkbox"/>
                    <span className="slider round"><DarkModeToggle /></span>
                    </label> 
                </li>
                </div>
            </ul>
        </div>
    </nav>
      {searchQuery ? (<>
 
 <div className='searching'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
  </div>
       
<div className='images'> 
        {images.map((image) => (
            <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image'></img>
      ))}

        <div className='buttons'>
        {page > 1 && <Button onClick={()=>setPage(page - 1)}>Previous</Button>}
       <Button onClick={Next}>Next</Button>
      </div>
      </div></>
      ):(
          <PhotoList/>
      )}
  
    
      </div>); 
    }
export default App;
