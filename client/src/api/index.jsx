// writer : 심영효
import axios from "axios";

const BASE_URL = "https://secured.tf2-lguplus.shop/api"; //process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
