const Planet = require('../models/Planet');

const getPlanetsPage = async (req, res) => {
    try {
        const planets = await Planet.find().sort({ displayOrder: 1 }).lean();
        res.render('planets/index', {
            title: 'Planets',
            planets,
        });
    } catch (error) {
        console.error('Planet page error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const getPlanetDetail = async (req, res) => {
    try {
        const planet = await Planet.findOne({ slug: req.params.slug }).lean();
        if (!planet) {
            return res.status(404).send('Planet not found');
        }
        res.render('planets/detail', {
            title: planet.name,
            planet,
        });
    } catch (error) {
        console.error('Planet detail error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getPlanetsPage,
    getPlanetDetail,
};
