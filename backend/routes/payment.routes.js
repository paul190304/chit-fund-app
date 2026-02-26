const express = require("express");
const router = express.Router();

const {
  recordPayment
} = require("../controllers/payment.controller");

router.post("/", recordPayment);

module.exports = router;