const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const safeReturnUrl = require('../utils/return-url');
const passport = require('passport');

const getAuthRegister = (req, res) => {
    res.render('auth/register.ejs', {
        errors: [],
        formData: {},
    });
}

const postAuthRegister = async (req, res) => {
    try {
      const { fullname, email, password, location, confirmPassword } = req.body; // Lấy dữ liệu từ request body
      console.log(req.body);

      if (password !== confirmPassword) {
            return res.send("Confirm password is incorrect.");// Kiểm tra xác nhận mật khẩu
      }
      if (!fullname || !email || !password || !confirmPassword) {
    return res.send("Please fill all fields.");
}
      const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu
      const existingUser = await User.findOne({
            email: email.toLowerCase()
        });
        if (existingUser) {
            return res.send("Email already exists.");
      }
              const user = new User({// Tạo một đối tượng người dùng mới`
            fullname,
            email: email.toLowerCase(),
            password: hashedPassword,
            location
              });
      await user.save();
      res.redirect("/v1/auth/login");
    } catch (error) {
      console.log("error dawng ky : ", error);
    }
}

//đăng nhập 
const getAuthLogin = (req, res) => {
    res.render('auth/login.ejs', {
        errors: [], // lần đầu mở file chưa có lỗi nên để mảng rỗng
        formData: {}, // lần đầu mở file chưa có dữ liệu nên để mảng rỗng
        returnUrl: safeReturnUrl(req.query.returnUrl, '') // đưa người dung về trang trước đó sau khi đăng nhập thành công
    });
}
const postAuthLogin = (req, res, next) => {

    passport.authenticate(
        "local",
        {
            successRedirect: "/",
            failureRedirect: "/v1/auth/login"
        }
    )(req, res, next);

};

const getAuthLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }

        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/v1/auth/login');
        });
    });
};

module.exports = {
    getAuthRegister,
    postAuthRegister,
    getAuthLogin,
    postAuthLogin,
    getAuthLogout
}
