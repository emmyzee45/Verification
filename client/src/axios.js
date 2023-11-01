import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://ec2-13-58-73-40.us-east-2.compute.amazonaws.com/api/",
  withCredentials: true,
});
