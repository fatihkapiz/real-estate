import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../Services/AuthInfo";
import RealEstate from "../Components/RealEstate";
import { GetEstateCurrency, GetEstateStatus, GetEstateType, GetPhotos } from "../Services/RealEstateService";

function ViewRealEstate() {
  const [data, setData] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [currency, setCurrency] = useState("");
  const [tip, setTip] = useState("");
  const [status, setStat] = useState("");
  const [id, setId] = useState("");
  const [imageUrl, setUrl] = useState("");

  const handler = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5124/realestate".concat("?id=").concat(id); 
    await axios
      .get(url, config())
      .then((response) => {
        setData(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

      // get status
      var item;
      await axios.get("http://localhost:5124/realestate/getstatus".concat("?id=").concat(id),  config())
      .then(response => {
          item = response.data;
          console.log(item)
          setStat(item);
      })
      .catch(error => {
          console.log(error);
      })

      // get currency
      await axios.get("http://localhost:5124/realestate/getcurrency".concat("?id=").concat(id),  config())
      .then(response => {
          item = response.data;
          console.log(item)
          setCurrency(item);
      })
      .catch(error => {
          console.log(error);
      })

      // get photos
      var photoList = []
      await axios.get("http://localhost:5124/realestate/getphotos".concat("?id=").concat(id),  config())
      .then(response => {
        photoList = response.data;
        setPhotos(photoList);
        console.log(photoList);
      })
      .catch(error => {
        return error;
      }) 

      await axios.get("http://localhost:5124/realestate/gettype".concat("?id=").concat(id),  config())
      .then(response => {
          item = response.data;
          console.log(item)
          setTip(item);
      })
      .catch(error => {
          console.log(error);
      })

      const imageUrl = photos.photos[0];
      console.log(imageUrl)
  };
  return (
    <div>
      <h1>Real Estate</h1>
      <input type="text" value={id || ''} onChange={(e) => setId(e.target.value)}/>
      <button onClick={handler}>Get Real Estate</button>
      {data && <RealEstate title={data.title} price={data.price} size={data.size} status={status} type={tip} currency={currency}/>}
      <div className="image-previews">
        <img src={imageUrl}></img>
      </div>
    </div>
  );
}

export default ViewRealEstate;
