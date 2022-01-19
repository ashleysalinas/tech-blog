const express = require('express');
const routes = require('./controllers');
const app = express();
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');


const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(3001, () => {
        console.log('Now listening')
    })
})