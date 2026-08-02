import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Suplemen from './suplemen.model.js'
import User from './user.model.js';

export interface FavoriteAttributes {
  id?: number;
  user_id: number;
  suplemen_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Favorite extends Model<FavoriteAttributes> implements FavoriteAttributes {
  declare id: number;
  declare user_id: number;
  declare suplemen_id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  suplemen_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'suplemens', 
      key: 'id'
    }
  },
}, {
  sequelize,
  tableName: 'favorites',
  timestamps: true,
});


Favorite.belongsTo(Suplemen, { foreignKey: 'suplemen_id' });
Suplemen.hasMany(Favorite, { foreignKey: 'suplemen_id' });

Favorite.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Favorite, { foreignKey: 'user_id' });

export default Favorite;