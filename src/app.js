
const express = require("express");
const webRouter = require('./routes/web');
const viewconfig = require('./config/viewEngine');
const connections = require('./config/data');

const app = express();
const PORT = 8386;

//config view Engine
viewconfig(app);

// config web
app.use('/', webRouter);

(async (req, res) => {
    try {
        await connections();
        app.listen(PORT, () => {
            console.log(`>>> running is ${PORT}`);
        });
    } catch (error) {
        console.log("error db : ", error);
    }

})();

