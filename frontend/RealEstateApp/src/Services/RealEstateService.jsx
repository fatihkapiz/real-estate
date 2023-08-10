import axios from "axios"
import { config } from "./AuthInfo";

export async function GetPhotos(request) {
  var photoList = []
  await axios.get("http://localhost:5124/realestate/getphotos".concat("?id=").concat(request),  config())
  .then(response => {
    photoList = response.data;
    return photoList;
  })
  .catch(error => {
    return error;
  }) 
}

export async function GetEstateCurrency(request) {
  await axios.get("http://localhost:5124/realestate/getcurrency".concat("?id=").concat(request),  config())
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error;
  }) 
}

export async function GetEstateStatus(request) {
  await axios.get("http://localhost:5124/realestate/getstatus".concat("?id=").concat(request),  config())
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error;
  }) 
}

export async function GetEstateType(request) {
  await axios.get("http://localhost:5124/realestate/gettype".concat("?id=").concat(request),  config())
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error;
  }) 
}

export async function Add(request) {
  console.log(request);
  await axios.post("http://localhost:5124/realestate", request, config()
  )
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function GetList() {
  let ls = [];

  await axios.get("http://localhost:5124/realestate/list", config())
  .then(response => {
    if (response.statusText === "OK") {
      ls = response.data;
      console.log(ls);
    }
  })
  .catch(error => {
    return error;
  });
  return ls;
}

export async function Delete(_id) {
  const url = "http://localhost:5124/realestate".concat("?id=").concat(_id);
  await axios.delete(url, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function Edit(request) {
  await axios.put("http://localhost:5124/currency", {id: request.id, currency: request.currency}, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function Get() {
  await axios.get("http://localhost:5124/Status", config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}