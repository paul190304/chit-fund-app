const {
  insertMember,
  getAllMembers
} = require("../repositories/member.repository");

/* ======================================================
   ADD MEMBER (BUSINESS LOGIC)
====================================================== */
async function addMemberService({ fullName, phone, whatsapp }) {
  if (!fullName || !phone || !whatsapp) {
    throw new Error("All member details required");
  }

  const memberId = await insertMember({
    fullName,
    phone,
    whatsapp
  });

  return {
    message: "Member added successfully",
    memberId
  };
}

/* ======================================================
   GET MEMBERS
====================================================== */
async function getMembersService() {
  return await getAllMembers();
}

module.exports = {
  addMemberService,
  getMembersService
};