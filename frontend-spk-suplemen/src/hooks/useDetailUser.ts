import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setToaster } = useContext(ToasterContext);

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["User", id],
    queryFn: async () => {
      const res = await userServices.getUserById(Number(id));
      return res.data.data;
    },
    enabled: !!id && router.isReady,
  });

  const {
    mutate: mutateUpdateUser,
    isPending: isPendingUpdateUser,
    isSuccess: isSuccessUpdateUser,
  } = useMutation({
    mutationFn: async (payload: Partial<IUser>) => {
      const res = await userServices.updateUser(Number(id), payload);
      return res.data;
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "User profile updated successfully!",
      });
      router.push("/admin/user");
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.meta?.message || "Failed to update user",
      });
    },
  });

  return {
    dataUser: data,
    isLoadingUser,
    mutateUpdateUser,
    isPendingUpdateUser,
    isSuccessUpdateUser,
  };
};

export default useDetailUser;