const express = require("express");
const router = express.Router();

const { getVehicles } = require("../services/api.service");
const { selectVehicles } = require("../services/scheduler.service");

router.get("/schedule", async (req, res) => {
  try {
    const hours = Number(req.query.hours);

    if (!hours) {
      return res.status(400).json({
        message: "hours query parameter required",
      });
    }

    const vehicleResponse = await getVehicles();

    const vehicles = vehicleResponse.vehicles;

    const result = selectVehicles(vehicles, hours);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;