const express = require('express');
const router = express.Router();
const { EventsPage } = require('../controllers/eventController');
const { getEventDetail } = require('../controllers/eventDetailController');

router.get('/', EventsPage);
router.get('/:slug', getEventDetail);

module.exports = router;
