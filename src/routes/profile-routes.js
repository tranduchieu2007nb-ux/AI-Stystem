const express = require("express");
const { getProfilePage, postUpdateProfile } = require("../controllers/profileController");
const router = express.Router();

router.get("/", getProfilePage);
    
router.post('/update', postUpdateProfile);

module.exports = router;