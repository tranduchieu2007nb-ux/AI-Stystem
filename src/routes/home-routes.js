const express = require("express");
const { HomePage } = require("../controllers/homeControllers");
const router = express.Router();



router.get("/", HomePage);


module.exports = router;