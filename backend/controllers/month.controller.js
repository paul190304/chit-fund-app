const {
  createMonthService,
  lockMonthService,
  getMonthsService,
  getMonthByIdService
} = require("../services/month.service");

/* ======================================================
   CREATE MONTH CONTROLLER
====================================================== */
async function createMonth(req, res) {
  try {
    const result = await createMonthService(req.body);
    res.json({ message: "Month created successfully", data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/* ======================================================
   LOCK MONTH CONTROLLER
====================================================== */
async function lockMonth(req, res) {
  try {
    const result = await lockMonthService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/* ======================================================
   GET ALL MONTHS CONTROLLER
====================================================== */
async function getMonths(req, res) {
  try {
    const months = await getMonthsService();
    res.json(months);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/* ======================================================
   GET MONTH BY ID CONTROLLER
====================================================== */
async function getMonthById(req, res) {
  try {
    const month = await getMonthByIdService(req.params.id);
    res.json(month);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createMonth,
  lockMonth,
  getMonths,
  getMonthById
};