import { Op } from "sequelize";
import Suplemen, { SuplemenAttributes } from "../models/suplemen.model.js";
import SuplemenDetail from "../models/suplemen_detail.model.js";

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

  async getAllForChat() {
    return await Suplemen.findAll({
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