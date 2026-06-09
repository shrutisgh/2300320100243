function selectVehicles(tasks, maxHours) {
  const n = tasks.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(maxHours + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const duration = tasks[i - 1].Duration;
    const impact = tasks[i - 1].Impact;

    for (let h = 0; h <= maxHours; h++) {
      if (duration <= h) {
        dp[i][h] = Math.max(
          dp[i - 1][h],
          impact + dp[i - 1][h - duration]
        );
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }

  let h = maxHours;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][h] !== dp[i - 1][h]) {
      selected.push(tasks[i - 1]);
      h -= tasks[i - 1].Duration;
    }
  }

  return {
    maxImpact: dp[n][maxHours],
    selectedTasks: selected.reverse(),
  };
}

module.exports = {
  selectVehicles,
};