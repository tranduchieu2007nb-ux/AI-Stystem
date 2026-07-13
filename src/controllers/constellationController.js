const Constellation = require('../models/Constellation');

const getConstellationsPage = async (req, res) => {
    try {
        const constellations = await Constellation.find().sort({ name: 1 }).lean();
        res.render('constellations/index', {
            title: 'Constellations',
            constellations,
        });
    } catch (error) {
        console.error('Constellation page error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const getConstellationDetail = async (req, res) => {
    try {
        const constellation = await Constellation.findOne({ slug: req.params.slug }).lean();
        if (!constellation) {
            return res.status(404).send('Constellation not found');
        }
        res.render('constellations/detail', {
            title: constellation.name,
            constellation,
        });
    } catch (error) {
        console.error('Constellation detail error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getConstellationsPage,
    getConstellationDetail,
};
