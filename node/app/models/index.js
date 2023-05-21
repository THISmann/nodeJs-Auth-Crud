// import config file
const config = require("../config/db.config.js");
// import sequelize
const Sequelize = require("sequelize");
// initialize sequelize model
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  logging: false,
});
// create a db instance
const db = {};

// initialize sequelize 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models 
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.publication = require("../models/publication.model.js")(sequelize, Sequelize); 

/**
 * create a relation many to many with users and role
 */
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

/**
 * create a relation many to many with users and publication
 */
db.publication.belongsToMany(db.user, {
  through: "user_publications",
  foreignKey: "publicationId",
  otherKey: "userId",
});

db.user.belongsToMany(db.publication, {
  through: "user_publications",
  foreignKey: "userId",
  otherKey: "publicationId",
});

// db.user.hasMany(db.publication, { as: "publication" });
// db.publication.belongsTo(db.user, {
//   foreignKey: "publicationId",
//   as: "publication",
// });

// define some default role
db.ROLES = ["user", "admin", "moderator"];

// export module
module.exports = db;
