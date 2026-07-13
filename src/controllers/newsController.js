const News = require('../models/News');

const getNewsPage = async (req, res) => {
    try {
        const newsItems = await News.find().sort({ publishDate: -1 }).lean();
        res.render('news/index', {
            title: 'News',
            newsItems,
        });
    } catch (error) {
        console.error('News page error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const getNewsDetail = async (req, res) => {
    try {
        const newsItem = await News.findOne({ slug: req.params.slug }).lean();
        if (!newsItem) {
            return res.status(404).send('News item not found');
        }
        res.render('news/detail', {
            title: newsItem.title,
            newsItem,
        });
    } catch (error) {
        console.error('News detail error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getNewsPage,
    getNewsDetail,
};
