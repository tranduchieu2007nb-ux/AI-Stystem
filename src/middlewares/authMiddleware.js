const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/v1/auth/login');
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/v1/auth/login');
    }
    if (req.user.role !== 'admin') {
        return res.status(403).send('Bạn không có quyền truy cập trang này.');
    }
    next();
};

module.exports = {
    requireAuth,
    requireAdmin,
};
