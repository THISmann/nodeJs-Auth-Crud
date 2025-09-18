/**
 * database model for publication
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      media:{
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      }
    });
  
    return Publication;

  };