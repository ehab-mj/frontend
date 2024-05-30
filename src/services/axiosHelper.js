import axios from "axios";
import { getToken } from "./storageService";


axios.defaults.baseURL = "http://localhost:3030/api";
// axios.defaults.baseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {



    config.headers["x-auth-token"] = token;
  }
  console.log(axios);
  return config;
});
