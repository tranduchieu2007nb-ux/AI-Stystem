
const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.send("đăng nhập thành công vào trang web home");
})

module.exports = router;