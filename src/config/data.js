
const mogoose = require('mongoose');
require('dotenv').config();


const connections = async (req, res) => {
    try {
        await mogoose.connect(process.env.DB_HOST);
        console.log("connect ok database");
    } catch (error) {
        console.log("error database : ", error);
    }

}

module.exports = connections;