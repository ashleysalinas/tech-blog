const express = require('express');

const app = express();
const sequelize = require('./config/connection');


sequelize.sync({ force: false }).then(() => {
    app.listen(3001, () => {
        console.log('Now listening')
    })
})