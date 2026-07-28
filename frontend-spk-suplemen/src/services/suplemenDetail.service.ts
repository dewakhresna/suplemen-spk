import instance from "@/libs/axios/instance";
import { ISuplemenDetail } from "@/components/views/Admin/DetailSuplemen/SuplemenDetailTab/SuplemenDetailTab";

const suplemenDetailServices = {
  getDetailBySuplemenId: (suplemen_id: number) => instance.get(`/suplemen-details/suplemen/${suplemen_id}`),
  createDetail: (payload: ISuplemenDetail) => instance.post(`/suplemen-details/create`, payload),
  updateDetail: (suplemen_id: number, payload: ISuplemenDetail) => instance.put(`/suplemen-details/suplemen/${suplemen_id}`, payload),
};

export default suplemenDetailServices;