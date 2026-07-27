import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteUser = async (id: string) => {
    const res = await userServices.deleteUser(Number(id));
    return res;
  };

  const {
    mutate: mutateDeleteUser,
    isPending: isPendingMutateDeleteUser,
    isSuccess: isSuccessMutateDeleteUser,
  } = useMutation({
    mutationFn: deleteUser,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "Failed to delete user data", 
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "User data successfully deleted!", 
      });
    },
  });

  return {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  };
};

export default useDeleteUserModal;