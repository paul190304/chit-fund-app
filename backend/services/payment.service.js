const {
  getMonthLockInfo,
  checkDuplicatePayment,
  insertPayment
} = require("../repositories/payment.repository");

/* ======================================================
   RECORD PAYMENT (BUSINESS LOGIC)
====================================================== */
async function recordPaymentService({ monthId, memberId, paymentMode }) {
  if (!monthId || !memberId || !paymentMode) {
    throw new Error("monthId, memberId and paymentMode required");
  }

  if (!["CASH", "ONLINE"].includes(paymentMode)) {
    throw new Error("Payment mode must be CASH or ONLINE");
  }

  const month = await getMonthLockInfo(monthId);

  if (!month) {
    throw new Error("Month not found");
  }

  if (month.is_locked !== 1) {
    throw new Error("Month must be locked before accepting payments");
  }

  const duplicate = await checkDuplicatePayment(monthId, memberId);

  if (duplicate) {
    throw new Error("Payment already recorded for this member");
  }

  const paymentId = await insertPayment({
    monthId,
    memberId,
    amount: month.pay_amount,
    paymentMode
  });

  return {
    message: "Payment recorded successfully",
    paymentId
  };
}

module.exports = {
  recordPaymentService
};
