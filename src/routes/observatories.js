const express = require('express');
const router = express.Router();
const { getObservatoriesPage } = require('../controllers/observatoryController');

router.get('/', getObservatoriesPage);

module.exports = router;
