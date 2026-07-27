import { ToasterContext } from "@/contexts/ToasterContext";
import houseServices from "@/services/house.service";
import houseDetailServices from "@/services/houseDetail.service";
import { IHouse } from "@/types/House";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IHouseDetail } from "./HouseDetailTab/HouseDetailTab";

const useDetailHouse = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getHouseById = async () => {
    const res = await houseServices.getHouseById(Number(query.id));
    return res.data.data; 
  };

  const { data: dataHouse, refetch: refetchHouse } = useQuery({
    queryKey: ["House", query.id],
    queryFn: getHouseById,
    enabled: isReady && !!query.id, 
  });

  const {
    mutate: mutateUpdateHouse,
    isPending: isPendingMutateUpdateHouse,
    isSuccess: isSuccessMutateUpdateHouse,
  } = useMutation({
    mutationFn: async (payload: IHouse) => {
      const res = await houseServices.updateHouse(Number(query.id), payload);
      return res.data.data;
    },
    onError: (error: any) => {
      setToaster({ type: "error", message: error.response?.data?.meta?.message || "Gagal mengubah data utama" });
    },
    onSuccess: () => {
      refetchHouse();
      setToaster({ type: "success", message: "Data rumah berhasil diperbarui!" });
    },
  });


  const getHouseDetail = async () => {
    try {
      const res = await houseDetailServices.getDetailByHouseId(Number(query.id));
      return res.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null; 
      throw error;
    }
  };

  const { data: dataHouseDetail, refetch: refetchHouseDetail } = useQuery({
    queryKey: ["HouseDetail", query.id],
    queryFn: getHouseDetail,
    enabled: isReady && !!query.id,
  });

  const {
    mutate: mutateUpdateHouseDetail,
    isPending: isPendingMutateUpdateHouseDetail,
    isSuccess: isSuccessMutateUpdateHouseDetail,
  } = useMutation({
    mutationFn: async (payload: IHouseDetail) => {
      if (dataHouseDetail) {
        const res = await houseDetailServices.updateDetail(Number(query.id), payload);
        return res.data.data;
      } else {
        const payloadWithHouseId = { ...payload, house_id: Number(query.id) };
        const res = await houseDetailServices.createDetail(payloadWithHouseId);
        return res.data.data;
      }
    },
    onError: (error: any) => {
      setToaster({ type: "error", message: error.response?.data?.meta?.message || "Gagal menyimpan detail rumah" });
    },
    onSuccess: () => {
      refetchHouseDetail();
      setToaster({ type: "success", message: "Detail dan galeri berhasil disimpan!" });
    },
  });

  return {
    dataHouse,
    handleUpdateHouse: (data: IHouse) => mutateUpdateHouse(data),
    isPendingMutateUpdateHouse,
    isSuccessMutateUpdateHouse,

    dataHouseDetail,
    handleUpdateHouseDetail: (data: IHouseDetail) => mutateUpdateHouseDetail(data),
    isPendingMutateUpdateHouseDetail,
    isSuccessMutateUpdateHouseDetail,
  };
};

export default useDetailHouse;