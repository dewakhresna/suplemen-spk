import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISuplemen } from "@/types/Suplemen";

const SuplemenServices = {
  getSuplemen: (params?: string) => instance.get(`${endpoint.SUPLEMEN}${params}`),
  getSuplemenById: (id: number) => instance.get(`${endpoint.SUPLEMEN}/${id}`),
  addSuplemen: (payload: ISuplemen) => instance.post(`${endpoint.SUPLEMEN}/create`, payload),
  updateSuplemen: (id: number, payload: ISuplemen) =>
    instance.put(`${endpoint.SUPLEMEN}/${id}`, payload),
  deleteSuplemen: (id: number) => instance.delete(`${endpoint.SUPLEMEN}/${id}`),
};

export default SuplemenServices;