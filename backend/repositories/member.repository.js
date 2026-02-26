const db = require("../db/database");

/* ======================================================
   INSERT MEMBER
====================================================== */
function insertMember(data) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO members (full_name, phone, whatsapp)
       VALUES (?, ?, ?)`,
      [data.fullName, data.phone, data.whatsapp],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

/* ======================================================
   GET ALL MEMBERS
====================================================== */
function getAllMembers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM members`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  insertMember,
  getAllMembers
};