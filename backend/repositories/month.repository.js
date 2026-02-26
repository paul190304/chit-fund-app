const db = require("../db/database");

/* ======================================================
   INSERT MONTH
====================================================== */
function insertMonth(data) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO monthly_cycles
       (month_label, bid_amount, pay_amount, total_collected, payout_amount, calculation_mode)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.monthLabel,
        data.bidAmount,
        data.payAmount,
        data.totalCollected,
        data.payoutAmount,
        data.calculationMode
      ],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

/* ======================================================
   LOCK MONTH
====================================================== */
function lockMonth(monthId) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE monthly_cycles SET is_locked = 1 WHERE id = ?`,
      [monthId],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
}

/* ======================================================
   GET ALL MONTHS
====================================================== */
function getAllMonths() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, month_label FROM monthly_cycles`,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

/* ======================================================
   GET MONTH BY ID
====================================================== */
function getMonthById(monthId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM monthly_cycles WHERE id = ?`,
      [monthId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

module.exports = {
  insertMonth,
  lockMonth,
  getAllMonths,
  getMonthById
};