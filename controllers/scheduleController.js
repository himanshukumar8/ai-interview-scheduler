const { createSchedule } = require("../services/scheduler");

exports.generateSchedule = (req, res) => {
  try {
    const data = req.body;

    const result = createSchedule(data);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error generating schedule",
    });
  }
};