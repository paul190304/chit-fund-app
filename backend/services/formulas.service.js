const CHIT_VALUE = 500000;
const MEMBERS = 20;
const MIN_BID = 20000;
const MAX_PAY = 25000;

function calculateFromBid(bidAmount) {
  if (!bidAmount || bidAmount < MIN_BID) {
    throw new Error("Bid amount must be at least 20000");
  }

  const payAmount = (CHIT_VALUE - bidAmount) / MEMBERS;

  if (payAmount <= 0 || payAmount > MAX_PAY) {
    throw new Error("Calculated pay amount invalid");
  }

  return {
    bidAmount,
    payAmount,
    totalCollected: payAmount * MEMBERS,
    payoutAmount: payAmount * MEMBERS,
    calculationMode: "BID"
  };
}

function calculateFromPay(payAmount) {
  if (!payAmount || payAmount <= 0 || payAmount > MAX_PAY) {
    throw new Error("Pay amount invalid");
  }

  const totalCollected = payAmount * MEMBERS;
  const bidAmount = CHIT_VALUE - totalCollected;

  if (bidAmount < MIN_BID) {
    throw new Error("Calculated bid below minimum commission");
  }

  return {
    bidAmount,
    payAmount,
    totalCollected,
    payoutAmount: totalCollected,
    calculationMode: "PAY"
  };
}

module.exports = {
  calculateFromBid,
  calculateFromPay
};