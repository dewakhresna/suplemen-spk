import { ToasterContext } from "@/contexts/ToasterContext";
import suplemenServices from "@/services/suplemen.service";
import suplemenDetailServices from "@/services/suplemenDetail.service";
import { ISuplemen } from "@/types/Suplemen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ISuplemenDetail } from "./SuplemenDetailTab/SuplemenDetailTab";

const useDetailSuplemen = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getSuplemenById = async () => {
    const res = await suplemenServices.getSuplemenById(Number(query.id));
    return res.data.data; 
  };

  const { data: dataSuplemen, refetch: refetchSuplemen } = useQuery({
    queryKey: ["Suplemen", query.id],
    queryFn: getSuplemenById,
    enabled: isReady && !!query.id, 
  });

  const {
    mutate: mutateUpdateSuplemen,
    isPending: isPendingMutateUpdateSuplemen,
    isSuccess: isSuccessMutateUpdateSuplemen,
  } = useMutation({
    mutationFn: async (payload: ISuplemen) => {
      const res = await suplemenServices.updateSuplemen(Number(query.id), payload);
      return res.data.data;
    },
    onError: (error: any) => {
      setToaster({ type: "error", message: error.response?.data?.meta?.message || "Gagal mengubah data utama suplemen" });
    },
    onSuccess: () => {
      refetchSuplemen();
      setToaster({ type: "success", message: "Data utama suplemen berhasil diperbarui!" });
    },
  });

  const getSuplemenDetail = async () => {
    try {
      const res = await suplemenDetailServices.getDetailBySuplemenId(Number(query.id));
      return res.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null; 
      throw error;
    }
  };

  const { data: dataSuplemenDetail, refetch: refetchSuplemenDetail } = useQuery({
    queryKey: ["SuplemenDetail", query.id],
    queryFn: getSuplemenDetail,
    enabled: isReady && !!query.id,
  });

  const {
    mutate: mutateUpdateSuplemenDetail,
    isPending: isPendingMutateUpdateSuplemenDetail,
    isSuccess: isSuccessMutateUpdateSuplemenDetail,
  } = useMutation({
    mutationFn: async (payload: ISuplemenDetail) => {
      if (dataSuplemenDetail) {
        const res = await suplemenDetailServices.updateDetail(Number(query.id), payload);
        return res.data.data;
      } else {
        const payloadWithSuplemenId = { ...payload, suplemen_id: Number(query.id) };
        const res = await suplemenDetailServices.createDetail(payloadWithSuplemenId);
        return res.data.data;
      }
    },
    onError: (error: any) => {
      setToaster({ type: "error", message: error.response?.data?.meta?.message || "Gagal menyimpan detail suplemen" });
    },
    onSuccess: () => {
      refetchSuplemenDetail();
      setToaster({ type: "success", message: "Detail suplemen dan galeri berhasil disimpan!" });
    },
  });

  return {
    dataSuplemen,
    handleUpdateSuplemen: (data: ISuplemen) => mutateUpdateSuplemen(data),
    isPendingMutateUpdateSuplemen,
    isSuccessMutateUpdateSuplemen,

    dataSuplemenDetail,
    handleUpdateSuplemenDetail: (data: ISuplemenDetail) => mutateUpdateSuplemenDetail(data),
    isPendingMutateUpdateSuplemenDetail,
    isSuccessMutateUpdateSuplemenDetail,
  };
};

export default useDetailSuplemen;