const path = require('path');
const express = require('express');


const viewconfig = (app) => {
   
    //config ejs
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    // config static files
    app.use(express.static(path.join(__dirname, '..', 'public')));
    

}
module.exports = viewconfig;