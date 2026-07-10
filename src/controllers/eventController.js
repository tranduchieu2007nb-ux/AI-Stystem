const Event = require('../models/Event');

const EventsPage = async (req, res) => {
    try {
        const events = await Event.find().sort({ startDate: 1 }).lean();
        res.render('events/index.ejs', {
            title: 'Events',
            events: events
        });
    } catch (error) {
        console.error('>>> lỗi events:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    EventsPage
};
