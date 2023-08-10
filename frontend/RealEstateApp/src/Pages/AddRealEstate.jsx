import { useEffect, useState } from 'react';
import axios from 'axios';

function AddRealEstate() {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); 

  useEffect(() => {
    let imageList = images;
    const previewArray = [];
    for (let i = 0; i < imageList.length; i++) {
      const url = URL.createObjectURL(new Blob(imageList[i], {type: 'image/jpg'}));
      previewArray.push(url);
    } 
    setImagePreviews(previewArray);
  }, [images]);

  const addImage = (e) => {
      let imageList = images;
      console.log(e.target.files);
      console.log(images)
      imageList.push(e.target.files);
      setImages(imageList);

      const previewArray = [];
      for (let i = 0; i < imageList.length; i++) {
          const url = URL.createObjectURL(new Blob(imageList[i], {type: 'image/jpg'}));
          previewArray.push(url);
      }
      setImagePreviews(previewArray);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
      });

      try {
          const response = await axios.post('/api/realEstate', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('Real Estate created with ID:', response.data);
      } catch (error) {
          console.error('Error creating Real Estate:', error);
      }
  };

  function deleteImage(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    console.log(s);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="file" accept="image/*" onChange={addImage}/>
          <button type="submit">Create Real Estate</button>
          <div className="image-previews">
              {imagePreviews.map((previewUrl, index) => (
                <div key={index}>
                  <img key={index} src={previewUrl} alt={`Preview ${index}`} style={{width: "15em", height: "15em"}} className="preview-image" />
                  <button type="button" onClick={() => deleteImage(index)}>Delete</button>
                </div>
              ))}
          </div>
      </form>
    </div>
  );
}

export default AddRealEstate;