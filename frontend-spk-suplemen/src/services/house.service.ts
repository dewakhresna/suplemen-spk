import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IHouse } from "@/types/House";

const houseServices = {
  getHouse: (params?: string) => instance.get(`${endpoint.HOUSE}${params}`),
  getHouseById: (id: number) => instance.get(`${endpoint.HOUSE}/${id}`),
  addHouse: (payload: IHouse) => instance.post(`${endpoint.HOUSE}/create`, payload),
  updateHouse: (id: number, payload: IHouse) =>
    instance.put(`${endpoint.HOUSE}/${id}`, payload),
  deleteHouse: (id: number) => instance.delete(`${endpoint.HOUSE}/${id}`),
};

export default houseServices;