import Favorite from "../models/favorite.model.js";
import House from "../models/house.model.js";
import HouseDetail from "../models/house_detail.model.js";

export default {
  async findAllByUser(userId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Favorite.findAndCountAll({
      where: { user_id: userId },
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
      include: [
        {
          model: House,
          include: [
            {
              model: HouseDetail,
            },
          ],
        },
      ],
    });

    return { count, rows };
  },

  async findByUserAndHouse(userId: number, houseId: number) {
    return await Favorite.findOne({
      where: {
        user_id: userId,
        house_id: houseId,
      },
    });
  },

  async create(data: { user_id: number; house_id: number }) {
    return await Favorite.create(data as any);
  },

  async delete(id: number) {
    return await Favorite.destroy({
      where: { id },
    });
  },
};