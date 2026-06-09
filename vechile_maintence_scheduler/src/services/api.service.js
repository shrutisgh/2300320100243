const axios = require("axios");

const BASE_URL = "http://4.224.186.213/evaluation-service";

const API = axios.create({
  baseURL: BASE_URL, // <-- baseURL, not baseUrl
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

const getDepots = async () => {
  const { data } = await API.get("/depots");
  return data;
};

const getVehicles = async () => {
  const { data } = await API.get("/vehicles"); // <-- vehicles, not vechiles
  return data;
};

module.exports = {
  getDepots,
  getVehicles,
};