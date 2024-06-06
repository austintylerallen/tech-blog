const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Ensure this points to your updated connection file
require('dotenv').config();
const { initModels } = require('./models');
const routes = require('./controllers');
const authRoutes = require('./controllers/authRoutes'); // Ensure correct path
const dashboardRoutes = require('./controllers/dashboardRoutes'); // Ensure correct path

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

initModels(sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');

  const sessionStore = new SequelizeStore({ db: sequelize });
  sessionStore.sync().then(() => {
    console.log('Session table synchronized');

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: { secure: process.env.NODE_ENV === 'production' }
    }));

    app.use((req, res, next) => {
      console.log('Session details:', req.session);
      next();
    });

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/api/users', authRoutes); // Correct base URL for auth routes
    app.use('/dashboard', dashboardRoutes); // Ensure the base URL is correct
    app.use(routes);

    app.use((err, req, res, next) => {
      console.error('Error occurred:', err.stack);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Something went wrong!' });
      }
    });

    app.use((req, res, next) => {
      res.status(404).json({ error: 'Sorry, we cannot find that!' });
    });

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to synchronize session store:', err);
  });
}).catch(err => {
  console.error('Failed to synchronize database:', err);
});

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/db-test', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    } else {
      res.send(result.rows);
    }
  });
});
