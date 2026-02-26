const express = require("express");
const router = express.Router();

const {
  createMonth,
  lockMonth,
  getMonths,
  getMonthById
} = require("../controllers/month.controller");

// Create Month
router.post("/", createMonth);

// Lock Month
router.post("/lock/:id", lockMonth);

// Get All Months
router.get("/", getMonths);

// Get Month By ID
router.get("/:id", getMonthById);

module.exports = router;