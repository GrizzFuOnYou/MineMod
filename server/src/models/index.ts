// server/src/models/index.ts
import { Sequelize } from 'sequelize';
import UserModel from './user';
import ServerModel from './server';
import ModModel from './mod';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: env === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize),
  Server: ServerModel(sequelize),
  Mod: ModModel(sequelize),
};

// Define associations
db.User.hasMany(db.Server, { foreignKey: 'userId', as: 'servers' });
db.Server.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.User.hasMany(db.Mod, { foreignKey: 'userId', as: 'mods' });
db.Mod.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

export default db;
