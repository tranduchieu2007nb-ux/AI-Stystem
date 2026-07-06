const express = require('express');
const Planet = require('../models/Planet');

const HomePage = async (req, res) => {
    try {
        const planets = await Planet.find(); // Lấy tất cả các hành tinh từ cơ sở dữ liệu
        res.render('home/index.ejs', {
            title: 'Home',
            planets: planets
        })
    } catch (error) {
        console.error(">>> lỗi trang chủ:", error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    HomePage

};