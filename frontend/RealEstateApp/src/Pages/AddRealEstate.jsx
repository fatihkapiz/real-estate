import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../Services/AuthInfo';

function AddRealEstate() {
  const [title, setTitleFirst] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imagesBase64, setBase] = useState([]);

  const [_currency, setCurrency] = useState("");
  const [_status, setStatus] = useState("");
  const [_type, setType] = useState("");
  const [_price, setPrice] = useState("");
  const [_size, setSize] = useState("");
  const [_title, setTitle] = useState("");
  
  let bodyObjectJson = {
    "id": 0,
    "currencyId": _currency,
    "statusId": _status,
    "typeId": _type,
    "price": _price,
    "size": _size,
    "title": _title,
    "photos": imagesBase64
  }

  const imageToBase64 = async (imageFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(new Blob(imageFile, {type: 'image/jpg'}));
    });
  };

  const handleSubmitBody = async (e) => {
    e.preventDefault();

    axios(
      
    )
    
    axios.post("http://localhost:5124/realestate", bodyObjectJson, config())
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  };

  useEffect(() => {
    let imageList = images;
    const previewArray = [];
    for (let i = 0; i < imageList.length; i++) {
      const url = URL.createObjectURL(new Blob(imageList[i], {type: 'image/jpg'}));
      previewArray.push(url);
    } 
    setImagePreviews(previewArray);
  }, [images]);

  const addImage = async (e) => {
      let imageList = images;
      console.log(e.target.files);
      console.log(images)
      imageList.push(e.target.files);
      setImages(imageList);

      const imagesBase64list = await Promise.all(images.map(imageToBase64));
      setBase(imagesBase64list);

      const previewArray = [];
      for (let i = 0; i < imageList.length; i++) {
          const url = URL.createObjectURL(new Blob(imageList[i], {type: 'image/jpg'}));
          previewArray.push(url);
      }
      setImagePreviews(previewArray);
  };

  function deleteImage(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    console.log(s);
  }

  return (
    <div>
      <h1>Create Real Estate Listing</h1>
      <form onSubmit={handleSubmitBody}>
        <input type="text" value={_title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter property description' />
        <input type="text" value={_size} onChange={(e) => setSize(e.target.value)} placeholder='Enter property size' />
        <input type="text" value={_price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter property price' />
        <input type="text" value={_currency} onChange={(e) => setCurrency(e.target.value)} placeholder='Enter currency id' />
        <input type="text" value={_type} onChange={(e) => setType(e.target.value)} placeholder='Enter type id' />
        <input type="text" value={_status} onChange={(e) => setStatus(e.target.value)} placeholder='Enter status id' />

        <input type="text" value={title} onChange={(e) => setTitleFirst(e.target.value)} />
        <input type="file" accept="image/*" onChange={addImage} placeholder='Select image'/>
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