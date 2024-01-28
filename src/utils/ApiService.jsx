import axios from "axios";

const API_URL = "https://65b5e668da3a3c16ab000398.mockapi.io";

const ApiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiService;
