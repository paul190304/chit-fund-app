const db = require("../db/database");

/* ======================================================
   CHECK MONTH LOCK + GET PAY AMOUNT
====================================================== */
function getMonthLockInfo(monthId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT pay_amount, is_locked FROM monthly_cycles WHERE id = ?`,
      [monthId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

/* ======================================================
   CHECK DUPLICATE PAYMENT
====================================================== */
function checkDuplicatePayment(monthId, memberId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM payments WHERE month_id = ? AND member_id = ?`,
      [monthId, memberId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

/* ======================================================
   INSERT PAYMENT
====================================================== */
function insertPayment(data) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO payments
       (member_id, month_id, amount, payment_mode, status, paid_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`,
      [
        data.memberId,
        data.monthId,
        data.amount,
        data.paymentMode,
        "PAID"
      ],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

module.exports = {
  getMonthLockInfo,
  checkDuplicatePayment,
  insertPayment
};