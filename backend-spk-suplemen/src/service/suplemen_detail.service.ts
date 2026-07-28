import SuplemenDetail, { SuplemenDetailAttributes } from '../models/suplemen_detail.model.js';

export default {
  async findBySuplemenId(suplemen_id: number) {
    return await SuplemenDetail.findOne({ 
      where: { suplemen_id }, 
      raw: true 
    });
  },

  async create(data: SuplemenDetailAttributes) {
    return await SuplemenDetail.create(data as any);
  },

  async update(suplemen_id: number, data: Partial<SuplemenDetailAttributes>) {
    return await SuplemenDetail.update(data, { 
      where: { suplemen_id } 
    });
  },

  async delete(suplemen_id: number) {
    return await SuplemenDetail.destroy({ 
      where: { suplemen_id } 
    });
  }
};