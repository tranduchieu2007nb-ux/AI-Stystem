const User = require("../models/Users");

// ==============================
// Hiển thị trang Profile
// ==============================
const getProfilePage = (req, res) => {

    // Nếu chưa đăng nhập
    if (!req.user) {
        return res.redirect("/v1/auth/login");
    }

    res.render("profile/index", {
        title: "Profile",
        user: req.user,
        error: null,
        success: null
    });

};

// ==============================
// Cập nhật Profile
// ==============================
const postUpdateProfile = async (req, res) => {

    try {

        const {
            fullname,
            email,
            location
        } = req.body;

        // ==========================
        // Kiểm tra dữ liệu rỗng
        // ==========================
        if (!fullname || !email || !location) {

            return res.render("profile/index", {
                title: "Profile",
                user: req.user,
                error: "Vui lòng nhập đầy đủ thông tin.",
                success: null
            });

        }

        // ==========================
        // Kiểm tra email trùng
        // ==========================
        const duplicateEmail = await User.findOne({

            email: email,

            _id: { $ne: req.user._id }

        });

        if (duplicateEmail) {

            return res.render("profile/index", {
                title: "Profile",
                user: req.user,
                error: "Email đã được sử dụng.",
                success: null
            });

        }

        // ==========================
        // Update MongoDB
        // ==========================
        await User.findByIdAndUpdate(

            req.user._id,

            {

                fullname,

                email,

                location

            }

        );

        // ==========================
        // Update req.user
        // (Navbar đổi tên ngay)
        // ==========================
        req.user.fullname = fullname;
        req.user.email = email;
        req.user.location = location;

        // ==========================
        // Render lại Profile
        // ==========================
        return res.render("profile/index", {

            title: "Profile",

            user: req.user,

            error: null,

            success: "Cập nhật thông tin thành công."

        });

    }

    catch (error) {

        console.log(error);

        return res.render("profile/index", {

            title: "Profile",

            user: req.user,

            error: "Có lỗi xảy ra.",

            success: null

        });

    }

};

module.exports = {

    getProfilePage,

    postUpdateProfile

};