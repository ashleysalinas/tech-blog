const req = require('express/lib/request');
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./usersSeed.json');
const postData = require('./postsSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();