"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn("Maps", "features", {
        type: Sequelize.JSONB,
        allowNull: false,
      }),
      queryInterface.addColumn("Maps", "initial_viewport", {
        type: Sequelize.JSONB,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn("Maps", "features"),
      queryInterface.removeColumn("Maps", "initial_viewport"),
    ]);
  },
};
