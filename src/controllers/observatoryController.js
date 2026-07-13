const getObservatoriesPage = async (req, res) => {
    const observatories = [
        {
            name: 'Hanoi Observatory',
            location: 'Hanoi, Vietnam',
            description: 'Đài thiên văn công cộng với kính viễn vọng và chuỗi sự kiện quan sát bầu trời.',
        },
        {
            name: 'Saigon Sky Center',
            location: 'Ho Chi Minh City, Vietnam',
            description: 'Trung tâm sao trời với chương trình khám phá hành tinh và chòm sao cho gia đình.',
        },
        {
            name: 'Da Lat Astronomy Park',
            location: 'Da Lat, Vietnam',
            description: 'Khu quan sát bầu trời trong lành, phù hợp cho người mới bắt đầu yêu thiên văn.',
        },
    ];

    res.render('observatories/index', {
        title: 'Observatories',
        observatories,
    });
};

module.exports = {
    getObservatoriesPage,
};
