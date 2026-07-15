
// const mongoose = require('mongoose');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const connections = async () => {
//     try {
//         const mongoUri = process.env.DB_HOST;
//         if (!mongoUri) {
//             throw new Error('DB_HOST is not defined in src/.env');
//         }
//         await mongoose.connect(mongoUri);
//         console.log('connect ok database');
//     } catch (error) {
//         console.error('error database :', error);
//         throw error;
//     }
// };

// module.exports = connections;


const mogoose = require('mongoose');
require('dotenv').config();


const connections = async (req, res) => {
    try {
        await mogoose.connect(process.env.DB_HOST);
        console.log("connect ok database");
    } catch (error) {
        console.log("error database : ", error);
    }
};

module.exports = connections;