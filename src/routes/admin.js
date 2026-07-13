const express = require('express');
const router = express.Router();
const { getAdminDashboard, getAdminUsers, getAdminPlanets } = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', requireAdmin, getAdminDashboard);
router.get('/users', requireAdmin, getAdminUsers);
router.get('/planets', requireAdmin, getAdminPlanets);

module.exports = router;
