const axios = require("axios");

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

async function fetchNotifications() {
  const response = await axios.get(API_URL);

  return response.data.notifications;
}

module.exports = {
  fetchNotifications,
};