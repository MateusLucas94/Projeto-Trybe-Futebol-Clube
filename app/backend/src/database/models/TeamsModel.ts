import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  id: number;
  teamName: string;
}

TeamsModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamsModel;
