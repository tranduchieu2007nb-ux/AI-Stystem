const express = require("express");
const Authrouter = express.Router();
const { getAuthRegister, postAuthRegister, getAuthLogin , postAuthLogin} = require('../controllers/authController');

// Đăng ký
Authrouter.get('/register', getAuthRegister);
Authrouter.post('/register', postAuthRegister);

// Đăng nhập
Authrouter.get('/login', getAuthLogin);
Authrouter.post('/login', postAuthLogin);
module.exports = Authrouter;