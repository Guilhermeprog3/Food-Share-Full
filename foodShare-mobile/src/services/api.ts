import axios from "axios";

export const api = axios.create({
  baseURL: "https://food-share-api.onrender.com/api",
});
