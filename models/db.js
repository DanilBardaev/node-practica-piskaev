const logger = require('../logger/index');
const { Sequelize } = require('sequelize');
require ("dotenv").config()
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'test.sqlite',
    logging: (msg) => {
        logger.info(msg);
    }
  });
  // ------------ Class Entry ---------------- //

 const Entry = sequelize.define("entries", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
       
      },
      content: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      imagePath: {
        type: Sequelize.STRING,
       
      },
      timestamp: {
        type: Sequelize.DATE,
       
      },
 })

 const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.INTEGER,
      
    },
  })

module.exports = {
    Entry, User, sequelize
}