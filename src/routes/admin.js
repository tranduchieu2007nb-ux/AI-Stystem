const express = require('express');
const router = express.Router();
const {
    getAdminHome,
    getCreatePlanet,
    postCreatePlanet,
    getEditPlanet,
    postEditPlanet,
    postDeletePlanet
} = require('../controllers/adminController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/adminAuth');

router.use(ensureAuthenticated, ensureAdmin);

router.get('/', getAdminHome);
router.get('/planets/create', getCreatePlanet);
router.post('/planets/create', postCreatePlanet);
router.get('/planets/:id/edit', getEditPlanet);
router.post('/planets/:id/edit', postEditPlanet);
router.post('/planets/:id/delete', postDeletePlanet);

module.exports = router;