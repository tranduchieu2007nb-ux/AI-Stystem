
const mogoose = require('mongoose');
require('dotenv').config();


const connections = async (req, res) => {
    try {
        await mogoose.connect("mongodb+srv://tranduchieu:TranH2007tbb@cluster0.rrqomah.mongodb.net/AI_Styme");
        console.log("connect ok database");
    } catch (error) {
        console.log("error database : ", error);
    }

}

module.exports = connections;