import useChangeUrl from "@/hooks/useChangeUrl";
import suplemenServices from "@/services/suplemen.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useSuplemen = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSuplemen = async () => {
    const limit = currentLimit || 10;
    const page = currentPage || 1;
    
    let params = `?limit=${limit}&page=${page}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    
    console.log("🎯 Menembak API dengan Params:", params); 
    
    const res = await suplemenServices.getSuplemen(params);
    return res.data;
  };

  const {
    data: dataSuplemen,
    isLoading: isLoadingSuplemen,
    isRefetching: isRefetchingSuplemen,
    refetch: refetchSuplemen,
    error,
  } = useQuery({
    queryKey: ["Suplemens", currentPage, currentLimit, currentSearch],
    queryFn: () => getSuplemen(),
    enabled: router.isReady, 
  });

  console.log("📡 Status React Query:", { isLoadingSuplemen, isError: !!error, dataSuplemen, error });

  return {
    dataSuplemen,
    isLoadingSuplemen,
    isRefetchingSuplemen,
    refetchSuplemen,

    selectedId,
    setSelectedId,
  };
};

export default useSuplemen;