
const express = require("express");
const webRouter = require('./routes/home-routes');
const Authrouter = require('./routes/auth');
const viewconfig = require('./config/viewEngine');
const profileRouter = require('./routes/profile-routes');
const adminRouter = require('./routes/admin');
const connections = require('./config/data');
const passport = require('passport');
const session = require('express-session');
const configPassport = require('./config/passport');

const app = express();
const PORT = 8386;

//config view Engine
viewconfig(app);

// parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config passport session
app.use(
    session({
        // Khóa bí mật dùng để mã hóa (ký) Session ID trong Cookie
        // Người dùng không nhìn thấy nội dung này.
        // Nên đặt chuỗi dài và khó đoán.
        secret: "abcxyz",
        // Nếu dữ liệu trong session không thay đổi
        // thì không ghi lại session xuống bộ nhớ hoặc database.
        // false giúp giảm số lần ghi, tăng hiệu năng.
        resave: false,
        // Nếu người dùng chỉ truy cập website
        // nhưng chưa lưu bất kỳ dữ liệu nào vào session
        // thì sẽ KHÔNG tạo session mới.
        // false giúp tránh tạo nhiều session rác.
        saveUninitialized: false
    })
);
// Gọi hàm cấu hình Passport
configPassport();
// Khởi tạo Passport
app.use(passport.initialize());
// Kết nối Passport với express-session
app.use(passport.session());
//truyền dữ liệu user vào res.locals để sử dụng trong view
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// config web
app.use('/', webRouter);
app.use('/v1/auth', Authrouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);

(async (req, res) => {
    try {
        await connections();
        app.listen(PORT, () => {
            console.log(`>>> running is ${PORT}`);
        });
    } catch (error) {
        console.log("error db : ", error);
    }

})();

