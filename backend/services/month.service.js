const {
  insertMonth,
  lockMonth,
  getAllMonths,
  getMonthById
} = require("../repositories/month.repository");

const { calculateFromBid, calculateFromPay } = require("./formulas.service");

/* ======================================================
   CREATE MONTH (BUSINESS LOGIC)
====================================================== */
async function createMonthService({ monthLabel, bidAmount, payAmount }) {
  if (!monthLabel) {
    throw new Error("Month label required");
  }

  if (bidAmount && payAmount) {
    throw new Error("Enter either Bid OR Pay amount, not both");
  }

  let result;

  if (bidAmount) {
    result = calculateFromBid(Number(bidAmount));
  } else if (payAmount) {
    result = calculateFromPay(Number(payAmount));
  } else {
    throw new Error("Bid or Pay amount required");
  }

  const monthId = await insertMonth({
    monthLabel,
    ...result
  });

  return {
    monthId,
    ...result
  };
}

/* ======================================================
   LOCK MONTH (BUSINESS RULE)
====================================================== */
async function lockMonthService(monthId) {
  const changes = await lockMonth(monthId);

  if (changes === 0) {
    throw new Error("Month not found");
  }

  return { message: "Month locked successfully" };
}

/* ======================================================
   GET MONTHS
====================================================== */
async function getMonthsService() {
  return await getAllMonths();
}

/* ======================================================
   GET MONTH BY ID
====================================================== */
async function getMonthByIdService(monthId) {
  const month = await getMonthById(monthId);

  if (!month) {
    throw new Error("Month not found");
  }

  return month;
}

module.exports = {
  createMonthService,
  lockMonthService,
  getMonthsService,
  getMonthByIdService
};