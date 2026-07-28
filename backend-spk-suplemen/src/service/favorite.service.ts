import Favorite from "../models/favorite.model.js";
import Suplemen from "../models/suplemen.model.js";
import SuplemenDetail from "../models/suplemen_detail.model.js";

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
          model: Suplemen,
          include: [
            {
              model: SuplemenDetail,
            },
          ],
        },
      ],
    });

    return { count, rows };
  },

  async findByUserAndSuplemen(userId: number, suplemenId: number) {
    return await Favorite.findOne({
      where: {
        user_id: userId,
        suplemen_id: suplemenId,
      },
    });
  },

  async create(data: { user_id: number; suplemen_id: number }) {
    return await Favorite.create(data as any);
  },

  async delete(id: number) {
    return await Favorite.destroy({
      where: { id },
    });
  },
};