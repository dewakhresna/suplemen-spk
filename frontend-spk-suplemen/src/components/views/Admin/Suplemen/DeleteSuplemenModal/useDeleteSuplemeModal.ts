import { ToasterContext } from "@/contexts/ToasterContext";
import suplemenServices from "@/services/suplemen.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteSuplemenModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteSuplemen = async (id: string) => {
    const res = await suplemenServices.deleteSuplemen(Number(id));
    return res;
  };

  const {
    mutate: mutateDeleteSuplemen,
    isPending: isPendingMutateDeleteSuplemen,
    isSuccess: isSuccessMutateDeleteSuplemen,
  } = useMutation({
    mutationFn: deleteSuplemen,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "Gagal menghapus data suplemen",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Data suplemen berhasil dihapus!",
      });
    },
  });

  return {
    mutateDeleteSuplemen,
    isPendingMutateDeleteSuplemen,
    isSuccessMutateDeleteSuplemen,
  };
};

export default useDeleteSuplemenModal;