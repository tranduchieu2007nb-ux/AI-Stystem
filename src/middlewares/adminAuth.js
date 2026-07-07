const ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/v1/auth/login');
    }
    next();
};

const ensureAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admin only.');
    }
    next();
};

module.exports = {
    ensureAuthenticated,
    ensureAdmin
};