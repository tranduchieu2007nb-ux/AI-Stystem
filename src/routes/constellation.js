const express = require('express');
const router = express.Router();
const { getConstellationsPage, getConstellationDetail } = require('../controllers/constellationController');

router.get('/', getConstellationsPage);
router.get('/:slug', getConstellationDetail);

module.exports = router;
