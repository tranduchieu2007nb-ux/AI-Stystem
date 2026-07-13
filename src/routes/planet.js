const express = require('express');
const router = express.Router();
const { getPlanetsPage, getPlanetDetail } = require('../controllers/planetController');

router.get('/', getPlanetsPage);
router.get('/:slug', getPlanetDetail);

module.exports = router;
