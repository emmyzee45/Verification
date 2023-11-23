import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://simver.net/api/",
  withCredentials: true,
}); 
