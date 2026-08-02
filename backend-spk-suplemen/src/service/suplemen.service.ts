import { Op } from "sequelize";
import Suplemen, { SuplemenAttributes } from "../models/suplemen.model.js";
import SuplemenDetail from "../models/suplemen_detail.model.js";

export interface ChatFilters {
  hargaMin?: number;
  hargaMax?: number;
  kandungan_nutrisiMin?: number;
  kandungan_nutrisiMax?: number;
}

export default {
  async findAll(page: number = 1, limit: number = 10, search: string = "") {
    const offset = (page - 1) * limit;
    const whereClause = search ? { nama: { [Op.like]: `%${search}%` } } : {};

    const { count, rows } = await Suplemen.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
      include: [
        {
          model: SuplemenDetail,
        },
      ],
    });

    return { count, rows };
  },

  async getFilteredForChat(filters: ChatFilters) {
    const { hargaMin, hargaMax, kandungan_nutrisiMin, kandungan_nutrisiMax } = filters;

    const whereSuplemen: any = {};

    if (hargaMin !== undefined || hargaMax !== undefined) {
      whereSuplemen.c1_harga = {};
      if (hargaMin !== undefined) whereSuplemen.c1_harga[Op.gte] = hargaMin;
      if (hargaMax !== undefined) whereSuplemen.c1_harga[Op.lte] = hargaMax; 
    }

    if (kandungan_nutrisiMin !== undefined || kandungan_nutrisiMax !== undefined) {
      whereSuplemen.c3_kandungan_nutrisi = {};
      if (kandungan_nutrisiMin !== undefined) whereSuplemen.c3_kandungan_nutrisi[Op.gte] = kandungan_nutrisiMin;
      if (kandungan_nutrisiMax !== undefined) whereSuplemen.c3_kandungan_nutrisi[Op.lte] = kandungan_nutrisiMax;
    }

    return await Suplemen.findAll({
      where: whereSuplemen,
      order: [["id", "DESC"]],
      include: [
        {
          model: SuplemenDetail,
        },
      ],
    });
  },

  async findById(id: number) {
    const suplemen = await Suplemen.findByPk(id, {
      include: [
        {
          model: SuplemenDetail,
        },
      ],
    });

    return suplemen;
  },

  async create(data: SuplemenAttributes) {
    return await Suplemen.create(data as any);
  },

  async update(id: number, data: Partial<SuplemenAttributes>) {
    return await Suplemen.update(data, {
      where: { id },
    });
  },

  async delete(id: number) {
    return await Suplemen.destroy({
      where: { id },
    });
  },
};