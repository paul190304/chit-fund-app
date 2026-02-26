const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("SQLite connected");
  }
});

db.serialize(() => {

  // Monthly Cycles
  db.run(`
    CREATE TABLE IF NOT EXISTS monthly_cycles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month_label TEXT UNIQUE,
      bid_amount INTEGER,
      pay_amount INTEGER,
      total_collected INTEGER,
      payout_amount INTEGER,
      calculation_mode TEXT,
      is_locked INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Members
  db.run(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT,
      phone TEXT,
      whatsapp TEXT,
      status TEXT DEFAULT 'ACTIVE',
      join_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Payments
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER,
      month_id INTEGER,
      amount INTEGER,
      payment_mode TEXT,
      status TEXT,
      paid_at DATETIME,
      FOREIGN KEY(member_id) REFERENCES members(id),
      FOREIGN KEY(month_id) REFERENCES monthly_cycles(id)
    )
  `);

  // Audit Logs
  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT,
      reference_id INTEGER,
      description TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

module.exports = db;