import axios from "axios";

const baseURL = process.env.API_BASE_URL;

const client = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
