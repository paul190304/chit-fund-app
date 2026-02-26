const express = require("express");
const router = express.Router();

const {
  addMember,
  getMembers
} = require("../controllers/member.controller");

// Add Member
router.post("/", addMember);

// Get All Members
router.get("/", getMembers);

module.exports = router;