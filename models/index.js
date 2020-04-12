import path from 'path';
import { Sequelize } from 'sequelize';
import User from './User';


const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Seqeulize = Sequelize;
db.User = User(sequelize, Sequelize);

console.log(db);
