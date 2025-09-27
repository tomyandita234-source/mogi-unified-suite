const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Read all model files and initialize them
const models = {};

// Load each model file
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'));

modelFiles.forEach(file => {
  const modelDef = require(path.join(__dirname, file));
  const model = modelDef(sequelize, DataTypes);
  models[model.name] = model;
});

// Run associations if they exist
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export models and sequelize instance
module.exports = {
  ...models,
  sequelize,
  Sequelize
};