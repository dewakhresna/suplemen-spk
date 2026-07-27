import useChangeUrl from "@/hooks/useChangeUrl";
import userServices from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useUser = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getUsers = async () => {
    const limit = currentLimit || 10;
    const page = currentPage || 1;
    
    let params = `?limit=${limit}&page=${page}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    
    const res = await userServices.getUsers(params);
    return res.data;
  };

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isRefetching: isRefetchingUser,
    refetch: refetchUser,
    error,
  } = useQuery({
    queryKey: ["Users", currentPage, currentLimit, currentSearch],
    queryFn: getUsers,
    enabled: router.isReady, 
  });

  return {
    dataUser,
    isLoadingUser,
    isRefetchingUser,
    refetchUser,
    selectedId,
    setSelectedId,
  };
};

export default useUser;