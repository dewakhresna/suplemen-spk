import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IUser } from "@/types/User"; 
const userServices = {
  getUsers: (params?: string) => instance.get(`${endpoint.USER}${params ? params : ""}`),
  getUserById: (id: number) => instance.get(`${endpoint.USER}/${id}`),
  updateUser: (id: number, payload: Partial<IUser>) =>
    instance.put(`${endpoint.USER}/${id}`, payload),
  deleteUser: (id: number) => instance.delete(`${endpoint.USER}/${id}`),
};

export default userServices;