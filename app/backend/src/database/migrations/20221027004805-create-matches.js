'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      homeTeam: {
        type: Sequelize.INTEGER,
        field: "home_team"
      },

      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: "home_team_goals"
      },

      awayTeam: {
        type: Sequelize.INTEGER,
        field: "away_team"
      },

      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: "away_team_goals"
      },

      inProgress: {
        type: Sequelize.BOOLEAN,
        field: "in_progress"
      },


    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
