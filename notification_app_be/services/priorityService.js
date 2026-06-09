const PRIORITY =
  require("../utils/priorityWeights");

function sortNotifications(
  notifications
) {
  return notifications.sort((a, b) => {

    const priorityA =
      PRIORITY[a.Type] || 0;

    const priorityB =
      PRIORITY[b.Type] || 0;

    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    return (
      new Date(b.Timestamp) -
      new Date(a.Timestamp)
    );
  });
}

function getTop10(notifications) {

  const sorted =
    sortNotifications(notifications);

  return sorted.slice(0, 10);
}

module.exports = {
  getTop10,
};