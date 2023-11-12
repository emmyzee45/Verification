import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://ec2-54-84-80-103.compute-1.amazonaws.com:5000/api/",
  withCredentials: true,
});
