const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const Message = require("./message");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

User(sequelize, DataTypes);
Message(sequelize, DataTypes);

const models = sequelize.models;

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
