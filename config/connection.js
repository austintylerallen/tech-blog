const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // This is important for Heroku/Render
        },
      },
      logging: console.log, // Enable logging to see SQL queries
      define: {
        timestamps: false, // Ensure timestamps are globally disabled
      },
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      logging: console.log, // Enable logging to see SQL queries
      define: {
        timestamps: false, // Ensure timestamps are globally disabled
      },
    });

module.exports = sequelize;
