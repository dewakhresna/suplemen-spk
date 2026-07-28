import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Suplemen from './suplemen.model.js';
export interface SuplemenDetailAttributes {
  id?: number;
  suplemen_id: number;
  link: string | null;
  store_name: string | null;
  description: string | null;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  rating: number | null;
  rater: number | null;
}

class SuplemenDetail extends Model<SuplemenDetailAttributes> implements SuplemenDetailAttributes {
  declare id: number;
  declare suplemen_id: number;
  declare link: string | null;
  declare store_name: string | null;
  declare description: string | null;
  declare image_1: string | null;
  declare image_2: string | null;
  declare image_3: string | null;
  declare rating: number | null;
  declare rater: number | null;
}

SuplemenDetail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  suplemen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Suplemen,
      key: 'id'
    },
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
  },
  link: DataTypes.STRING,
  store_name: DataTypes.STRING,
  description: {
    type: DataTypes.TEXT,
  },
  image_1: DataTypes.STRING,
  image_2: DataTypes.STRING,
  image_3: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  rater: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'suplemen_details',
  timestamps: true,
});

// Mendefinisikan Relasi Database
Suplemen.hasOne(SuplemenDetail, { foreignKey: 'suplemen_id', onDelete: 'CASCADE' });
SuplemenDetail.belongsTo(Suplemen, { foreignKey: 'suplemen_id' });

export default SuplemenDetail;