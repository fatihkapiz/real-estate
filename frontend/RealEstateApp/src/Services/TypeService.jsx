import axios from "axios"
import { config } from "./AuthInfo";

export async function addType(request) {
  await axios.post("http://localhost:5124/type", {
    type: request
  }, config()
  )
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getTypeList() {
  let typeList = [];

  await axios.get("http://localhost:5124/type/list", config())
  .then(response => {
    if (response.statusText === "OK") {
      typeList = response.data;
    }
  })
  .catch(error => {
    return error;
  });
  return typeList;
}

export async function deleteType(_id) {
  const url = "http://localhost:5124/type".concat("?id=").concat(_id);
  await axios.delete(url, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function editType(request) {
  await axios.put("http://localhost:5124/type", {id: request.id, type: request.type}, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getType() {
  await axios.get("http://localhost:5124/type", config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}