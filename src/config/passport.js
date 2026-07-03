const passport = require("passport"); 
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const session = require("express-session"); 

const configPassport = () => {

    passport.use(

        new LocalStrategy(

            {
                usernameField: "email", // ô username chính là email
                passwordField: "password" // ô password
            },

            async (email, password, done) => {

                try {

                    // tìm user theo email
                    const user = await User.findOne({
                        email: email
                    }).select("+password");

                    // nếu không tìm thấy
                    if (!user) {

                        return done(null, false, {
                            message: "Email không tồn tại."
                        });

                    }

                    // so sánh password người dùng nhập
                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    // sai mật khẩu
                    if (!isMatch) {
                        return done(null, false, {
                            message: "Sai mật khẩu."
                        });
                    }
                    // đúng email + password
                    return done(null, user);
                }
                catch (error) {
                    return done(error);
                }
            }
        ) );
    // lưu id vào session
    // sau khi đăng nhập thành công, passport sẽ lưu id của user vào session , ko lưu toàn bộ user
    passport.serializeUser((user, done) => {

        done(null, user.id);
    });
    // lấy thông tin user từ session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    });
};
module.exports = configPassport;