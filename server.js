console.log('Starting server...');

const path = require('path');
console.log('Loaded path module');
const express = require('express');
console.log('Loaded express module');
const session = require('express-session');
console.log('Loaded express-session module');
const exphbs = require('express-handlebars');
console.log('Loaded express-handlebars module');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
console.log('Loaded connect-session-sequelize module');

const sequelize = require('./config/connection');
console.log('Loaded sequelize config');
const routes = require('./controllers');
console.log('Loaded routes');
const helpers = require('./utils/helpers'); // Ensure this line is correct
console.log('Loaded helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
