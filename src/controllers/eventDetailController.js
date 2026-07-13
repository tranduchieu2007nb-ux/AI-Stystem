const Event = require('../models/Event');

const getEventDetail = async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug }).lean();
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.render('events/detail', {
            title: event.name,
            event,
        });
    } catch (error) {
        console.error('Event detail error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getEventDetail,
};
