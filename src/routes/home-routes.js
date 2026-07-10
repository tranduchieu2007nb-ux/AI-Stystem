const express = require("express");
const { HomePage } = require("../controllers/homeControllers");
const { EventsPage } = require("../controllers/eventController");
const router = express.Router();

router.get("/", HomePage);
router.get("/events", EventsPage);

module.exports = router;