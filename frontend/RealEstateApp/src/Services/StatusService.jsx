import axios from "axios"
import { config } from "./AuthInfo";

export async function addStatus(request) {
  await axios.post("http://localhost:5124/status", {
    status: request
  }, config()
  )
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getStatusList() {
  let statusList = [];

  await axios.get("http://localhost:5124/Status/list", config())
  .then(response => {
    if (response.statusText === "OK") {
      statusList = response.data;
    }
  })
  .catch(error => {
    return error;
  });
  return statusList;
}

export async function deleteStatus(_id) {
  const url = "http://localhost:5124/Status".concat("?id=").concat(_id);
  console.log(url);
  await axios.delete(url, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function editStatus(request) {
  await axios.put("http://localhost:5124/Status", {id: request.id, status: request.status}, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getStatus() {
  await axios.get("http://localhost:5124/Status", config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}