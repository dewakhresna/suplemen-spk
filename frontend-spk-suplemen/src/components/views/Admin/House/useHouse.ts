import useChangeUrl from "@/hooks/useChangeUrl";
import houseServices from "@/services/house.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useHouse = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getHouse = async () => {
    const limit = currentLimit || 10;
    const page = currentPage || 1;
    
    let params = `?limit=${limit}&page=${page}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    
    console.log("🎯 Menembak API dengan Params:", params); 
    
    const res = await houseServices.getHouse(params);
    return res.data;
  };

  const {
    data: dataHouse,
    isLoading: isLoadingHouse,
    isRefetching: isRefetchingHouse,
    refetch: refetchHouse,
    error,
  } = useQuery({
    queryKey: ["Houses", currentPage, currentLimit, currentSearch],
    queryFn: () => getHouse(),
    enabled: router.isReady, 
  });

  console.log("📡 Status React Query:", { isLoadingHouse, isError: !!error, dataHouse, error });

  return {
    dataHouse,
    isLoadingHouse,
    isRefetchingHouse,
    refetchHouse,

    selectedId,
    setSelectedId,
  };
};

export default useHouse;