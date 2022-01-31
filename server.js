const express = require('express');
const path = require('path')
const routes = require('./controllers');
const app = express();
const session = require('express-session');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'chamberOfSecrets',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}

app.use(session(sess))


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Now listening on 3001')
    })
})