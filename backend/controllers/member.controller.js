const {
  addMemberService,
  getMembersService
} = require("../services/member.service");

/* ======================================================
   ADD MEMBER CONTROLLER
====================================================== */
async function addMember(req, res) {
  try {
    const result = await addMemberService(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/* ======================================================
   GET MEMBERS CONTROLLER
====================================================== */
async function getMembers(req, res) {
  try {
    const members = await getMembersService();
    res.json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  addMember,
  getMembers
};