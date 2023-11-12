import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://54.84.80.103:5000/api/",
  withCredentials: true,
});
