const {
  fetchNotifications,
} = require("../services/affordmedService");

const {
  getTop10,
} = require("../services/priorityService");

async function getPriorityNotifications(
  req,
  res
) {
  try {

    const notifications =
      await fetchNotifications();

    const top10 =
      getTop10(notifications);

    return res.status(200).json({
      count: top10.length,
      data: top10,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getPriorityNotifications,
};