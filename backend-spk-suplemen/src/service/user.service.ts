import { Op } from "sequelize";
import User, { UserAttributes } from "../models/user.model.js";

export default {
  async findAll(page: number = 1, limit: number = 10, search: string = "") {
    const offset = (page - 1) * limit;
    
    const whereClause = search ? {
      [Op.or]: [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ]
    } : {};

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
      attributes: { exclude: ['password'] }
    });

    return { count, rows };
  },

  async findById(id: number) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return user;
  },

  async update(id: number, data: Partial<UserAttributes>) {
    return await User.update(data, {
      where: { id },
    });
  },

  async delete(id: number) {
    return await User.destroy({
      where: { id },
    });
  },
};