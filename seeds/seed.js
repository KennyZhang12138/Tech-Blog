const sequelize = require("../config/connection");
const { Post, User } = require("../models");

const userData = require("./userData.json");
const postDate = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postDate);

  process.exit(0);
};

seedDatabase();