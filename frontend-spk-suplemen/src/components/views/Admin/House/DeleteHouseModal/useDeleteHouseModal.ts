import { ToasterContext } from "@/contexts/ToasterContext";
import houseServices from "@/services/house.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteHouseModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteHouse = async (id: string) => {
    const res = await houseServices.deleteHouse(Number(id));
    return res;
  };

  const {
    mutate: mutateDeleteHouse,
    isPending: isPendingMutateDeleteHouse,
    isSuccess: isSuccessMutateDeleteHouse,
  } = useMutation({
    mutationFn: deleteHouse,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "Failed to delete data",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Home data successfully deleted!",
      });
    },
  });

  return {
    mutateDeleteHouse,
    isPendingMutateDeleteHouse,
    isSuccessMutateDeleteHouse,
  };
};

export default useDeleteHouseModal;