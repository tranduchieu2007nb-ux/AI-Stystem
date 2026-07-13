const express = require('express');
const router = express.Router();
const { getNewsPage, getNewsDetail } = require('../controllers/newsController');

router.get('/', getNewsPage);
router.get('/:slug', getNewsDetail);

module.exports = router;
