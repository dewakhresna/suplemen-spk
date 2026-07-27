import { Op } from "sequelize";
import House, { HouseAttributes } from "../models/house.model.js";
import HouseDetail from "../models/house_detail.model.js";

export default {
  async findAll(page: number = 1, limit: number = 10, search: string = "") {
    const offset = (page - 1) * limit;
    const whereClause = search ? { nama: { [Op.like]: `%${search}%` } } : {};

    const { count, rows } = await House.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
      include: [
        {
          model: HouseDetail,
        },
      ],
    });

    return { count, rows };
  },

  async getAllForChat() {
    return await House.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: HouseDetail,
        },
      ],
    });
  },

  async findById(id: number) {
    const house = await House.findByPk(id, {
      include: [
        {
          model: HouseDetail,
        },
      ],
    });

    return house;
  },

  async create(data: HouseAttributes) {
    return await House.create(data as any);
  },

  async update(id: number, data: Partial<HouseAttributes>) {
    return await House.update(data, {
      where: { id },
    });
  },

  async delete(id: number) {
    return await House.destroy({
      where: { id },
    });
  },
};
