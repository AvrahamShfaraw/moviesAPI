const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllActionLogs } = require("../controllers/actionController");

router.get("/", protect, getAllActionLogs);

module.exports = router;
