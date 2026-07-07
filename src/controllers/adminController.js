const Planet = require('../models/Planet');

const getAdminHome = async (req, res) => {
    try {
        const planets = await Planet.find().sort({ createdAt: -1 });
        res.render('admin/homeadmin', {
            title: 'Admin Dashboard',
            planets,
            user: req.user,
            error: null,
            success: null
        });
    } catch (error) {
        console.error('Admin page error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getCreatePlanet = (req, res) => {
    res.render('admin/createPlanet', {
        title: 'Create Planet',
        user: req.user,
        planet: {},
        error: null
    });
};

const postCreatePlanet = async (req, res) => {
    try {
        const { slug, name, image, description, diameter, mass, gravity, atmosphere, temperature, distanceSun, distanceEarth, facts, tags } = req.body;
        if (!slug || !name || !image || !description || !diameter || !mass || !gravity || !atmosphere || !temperature || !distanceSun || !distanceEarth) {
            return res.render('admin/createPlanet', {
                title: 'Create Planet',
                user: req.user,
                planet: req.body,
                error: 'Please fill all required fields.'
            });
        }

        const existing = await Planet.findOne({ slug });
        if (existing) {
            return res.render('admin/createPlanet', {
                title: 'Create Planet',
                user: req.user,
                planet: req.body,
                error: 'Slug already exists.'
            });
        }

        const newPlanet = new Planet({
            slug,
            name,
            image,
            description,
            diameter,
            mass,
            gravity,
            atmosphere,
            temperature,
            distanceSun,
            distanceEarth,
            facts: facts ? facts.split(',').map(item => item.trim()).filter(Boolean) : [],
            tags: tags ? tags.split(',').map(item => item.trim().toLowerCase()).filter(Boolean) : []
        });

        await newPlanet.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Create planet error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEditPlanet = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        if (!planet) {
            return res.redirect('/admin');
        }
        res.render('admin/editPlanet', {
            title: 'Edit Planet',
            user: req.user,
            planet,
            error: null
        });
    } catch (error) {
        console.error('Edit planet error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const postEditPlanet = async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        if (!planet) {
            return res.redirect('/admin');
        }

        const { slug, name, image, description, diameter, mass, gravity, atmosphere, temperature, distanceSun, distanceEarth, facts, tags } = req.body;
        if (!slug || !name || !image || !description || !diameter || !mass || !gravity || !atmosphere || !temperature || !distanceSun || !distanceEarth) {
            return res.render('admin/editPlanet', {
                title: 'Edit Planet',
                user: req.user,
                planet: { ...req.body, _id: req.params.id },
                error: 'Please fill all required fields.'
            });
        }

        planet.slug = slug;
        planet.name = name;
        planet.image = image;
        planet.description = description;
        planet.diameter = diameter;
        planet.mass = mass;
        planet.gravity = gravity;
        planet.atmosphere = atmosphere;
        planet.temperature = temperature;
        planet.distanceSun = distanceSun;
        planet.distanceEarth = distanceEarth;
        planet.facts = facts ? facts.split(',').map(item => item.trim()).filter(Boolean) : [];
        planet.tags = tags ? tags.split(',').map(item => item.trim().toLowerCase()).filter(Boolean) : [];

        await planet.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Update planet error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const postDeletePlanet = async (req, res) => {
    try {
        await Planet.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error('Delete planet error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAdminHome,
    getCreatePlanet,
    postCreatePlanet,
    getEditPlanet,
    postEditPlanet,
    postDeletePlanet
};