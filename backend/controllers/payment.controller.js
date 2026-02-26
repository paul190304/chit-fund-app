const {
  recordPaymentService
} = require("../services/payment.service");

/* ======================================================
   RECORD PAYMENT CONTROLLER
====================================================== */
async function recordPayment(req, res) {
  try {
    const result = await recordPaymentService(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  recordPayment
};