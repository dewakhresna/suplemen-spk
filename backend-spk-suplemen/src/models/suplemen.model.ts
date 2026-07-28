import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

export interface SuplemenAttributes {
  id?: number;
  nama: string | null;
  c1_harga: number | null;
  c2_ulasan_negatif: number | null;
  c3_kandungan_nutrisi: number | null;
  c4_efektivitas_manfaat: number | null;
}

class Suplemen extends Model<SuplemenAttributes> implements SuplemenAttributes {
  declare id: number;
  declare nama: string | null;
  declare c1_harga: number | null;
  declare c2_ulasan_negatif: number | null;
  declare c3_kandungan_nutrisi: number | null;
  declare c4_efektivitas_manfaat: number | null;
}

Suplemen.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: DataTypes.STRING,
  c1_harga: DataTypes.FLOAT,
  c2_ulasan_negatif: DataTypes.FLOAT,
  c3_kandungan_nutrisi: DataTypes.INTEGER,
  c4_efektivitas_manfaat: DataTypes.FLOAT,
}, {
  sequelize,
  tableName: 'suplemens',
  timestamps: false,
});

export default Suplemen;