import axios from "axios"
import { config } from "./AuthInfo";

export async function addCurrency(request) {
  await axios.post("http://localhost:5124/currency", {
    currency: request
  }, config()
  )
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getCurrencyList() {
  let currencyList = [];

  await axios.get("http://localhost:5124/currency/list", config())
  .then(response => {
    if (response.statusText === "OK") {
      currencyList = response.data;
      console.log(currencyList);
    }
  })
  .catch(error => {
    return error;
  });
  return currencyList;
}

export async function deleteCurrency(_id) {
  const url = "http://localhost:5124/currency".concat("?id=").concat(_id);
  await axios.delete(url, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function editCurrency(request) {
  await axios.put("http://localhost:5124/currency", {id: request.id, currency: request.currency}, config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}

export async function getCurrency() {
  await axios.get("http://localhost:5124/Status", config())
  .then(response => {
    return response;
  })
  .catch(error => {
    return error;
  });
}