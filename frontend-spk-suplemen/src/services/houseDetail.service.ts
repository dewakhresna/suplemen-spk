import instance from "@/libs/axios/instance";
import { IHouseDetail } from "@/components/views/Admin/DetailHouse/HouseDetailTab/HouseDetailTab";

const houseDetailServices = {
  getDetailByHouseId: (house_id: number) => instance.get(`/house-details/house/${house_id}`),
  createDetail: (payload: IHouseDetail) => instance.post(`/house-details/create`, payload),
  updateDetail: (house_id: number, payload: IHouseDetail) => instance.put(`/house-details/house/${house_id}`, payload),
};

export default houseDetailServices;