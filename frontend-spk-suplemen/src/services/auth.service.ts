import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  ILogin,
  IProfile,
  IRegister,
  IUpdatePassword,
} from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) => instance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  
  // Karena interceptor sudah menyisipkan token, tidak perlu kirim token manual lagi di sini!
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  
  updateProfile: (payload: IProfile) => instance.put(`${endpoint.AUTH}/profile`, payload), // Sesuaikan URL backend Anda
  updatePassword: (payload: IUpdatePassword) => instance.put(`${endpoint.AUTH}/password`, payload),
};

export default authServices;