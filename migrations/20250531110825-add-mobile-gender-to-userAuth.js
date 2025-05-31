'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userAuths', 'mobile', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('userAuths', 'gender', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userAuths', 'mobile');
    await queryInterface.removeColumn('userAuths', 'gender');
  }
};
