const User = require('../models/users');
const Planet = require('../models/Planet');
const Event = require('../models/Event');
const News = require('../models/News');

const getAdminDashboard = async (req, res) => {
    try {
        const [userCount, planetCount, eventCount, newsCount] = await Promise.all([
            User.countDocuments(),
            Planet.countDocuments(),
            Event.countDocuments(),
            News.countDocuments(),
        ]);

        res.render('admin/index', {
            title: 'Admin Overview',
            user: req.user,
            stats: {
                users: userCount,
                planets: planetCount,
                events: eventCount,
                news: newsCount,
            },
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        return res.status(500).send('Lỗi hệ thống.');
    }
};

const getAdminUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        res.render('admin/users', {
            title: 'Admin Users',
            user: req.user,
            users,
        });
    } catch (error) {
        console.error('Admin users error:', error);
        return res.status(500).send('Lỗi hệ thống.');
    }
};

const getAdminPlanets = async (req, res) => {
    try {
        const planets = await Planet.find().lean();
        res.render('admin/planets', {
            title: 'Admin Planets',
            user: req.user,
            planets,
        });
    } catch (error) {
        console.error('Admin planets error:', error);
        return res.status(500).send('Lỗi hệ thống.');
    }
};

module.exports = {
    getAdminDashboard,
    getAdminUsers,
    getAdminPlanets,
};
