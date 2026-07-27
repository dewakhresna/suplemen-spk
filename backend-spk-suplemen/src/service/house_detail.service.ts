import HouseDetail, { HouseDetailAttributes } from '../models/house_detail.model.js';

export default {
  async findByHouseId(house_id: number) {
    return await HouseDetail.findOne({ 
      where: { house_id }, 
      raw: true 
    });
  },

  async create(data: HouseDetailAttributes) {
    return await HouseDetail.create(data as any);
  },

  async update(house_id: number, data: Partial<HouseDetailAttributes>) {
    return await HouseDetail.update(data, { 
      where: { house_id } 
    });
  },

  async delete(house_id: number) {
    return await HouseDetail.destroy({ 
      where: { house_id } 
    });
  }
};