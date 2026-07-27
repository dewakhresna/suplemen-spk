import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import House from './house.model.js';

export interface HouseDetailAttributes {
  id?: number;
  house_id: number;
  contact: string | null;
  contact_name: string | null;
  description: string | null;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  beds: number | null;
  baths: number | null;
}

class HouseDetail extends Model<HouseDetailAttributes> implements HouseDetailAttributes {
  declare id: number;
  declare house_id: number;
  declare contact: string | null;
  declare contact_name: string | null;
  declare description: string | null;
  declare image_1: string | null;
  declare image_2: string | null;
  declare image_3: string | null;
  declare beds: number | null;
  declare baths: number | null;
}

HouseDetail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  house_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: House,
      key: 'id'
    },
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
  },
  contact: DataTypes.STRING,
  contact_name: DataTypes.STRING,
  description: {
    type: DataTypes.TEXT, 
  },
  image_1: DataTypes.STRING,
  image_2: DataTypes.STRING,
  image_3: DataTypes.STRING,
  beds: DataTypes.INTEGER,
  baths: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'house_details',
  timestamps: true,
});

House.hasOne(HouseDetail, { foreignKey: 'house_id', onDelete: 'CASCADE' });
HouseDetail.belongsTo(House, { foreignKey: 'house_id' });

export default HouseDetail;