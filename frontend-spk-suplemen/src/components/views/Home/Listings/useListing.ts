import { useState, useEffect, useCallback } from "react";
import instance from "@/libs/axios/instance";

export interface HouseData {
  id: number;
  nama: string;
  c1_harga: number;
  c2_jarak: number;
  c3_keamanan: number;
  c4_luas: number;
  HouseDetail?: {
    description: string | null;
    image_1: string | null;
    beds: number | null;
    baths: number | null;
  };
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export const useListing = () => {
  const [houses, setHouses] = useState<HouseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchHouses = useCallback(async (currentPage: number, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const housesRes = await instance.get(`/houses?page=${currentPage}&limit=${limit}`);
      
      const fetchedData = housesRes.data.data.rows || housesRes.data.data || [];
      let housesData: HouseData[] = fetchedData;

      if (fetchedData.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      let userId = currentUserId;
      if (!userId) {
        try {
          const authRes = await instance.get("/auth/me");
          userId = authRes.data?.data?.id || authRes.data?.id; 
          setCurrentUserId(userId);
        } catch (authErr) {
          console.log("Pengguna belum login (Guest Mode)");
        }
      }

      if (userId) {
        const favRes = await instance.get(`/favorites?userId=${userId}`);
        const userFavorites = favRes.data.data;

        const favoriteMap = new Map();
        userFavorites.forEach((fav: any) => {
          favoriteMap.set(fav.house_id, fav.id);
        });

        housesData = housesData.map((house) => ({
          ...house,
          isFavorite: favoriteMap.has(house.id),
          favoriteId: favoriteMap.get(house.id) || null,
        }));
      }

      if (isLoadMore) {
        setHouses((prev) => [...prev, ...housesData]);
      } else {
        setHouses(housesData);
      }

    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data properti. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentUserId, limit]);

  useEffect(() => {
    fetchHouses(1, false);
  }, [fetchHouses]);

  const refreshFavoritesOnly = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const favRes = await instance.get(`/favorites?userId=${currentUserId}`);
      const userFavorites = favRes.data.data;
const favoriteMap = new Map<number, number>(
        userFavorites.map((fav: any) => [fav.house_id, fav.id])
      );

      setHouses((prevHouses) => 
        prevHouses.map(house => ({
          ...house,
          isFavorite: favoriteMap.has(house.id),
          favoriteId: (favoriteMap.get(house.id) as number) || null 
        }))
      );

    } catch (error) {
      console.error("Gagal sinkronisasi ulang favorit", error);
    }
  }, [currentUserId]);

  useEffect(() => {
    window.addEventListener("favoriteChanged", refreshFavoritesOnly);
    return () => window.removeEventListener("favoriteChanged", refreshFavoritesOnly);
  }, [refreshFavoritesOnly]);

  const loadMore = () => {
    if (!hasMore || isLoadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHouses(nextPage, true);
  };

  return { houses, isLoading, isLoadingMore, error, currentUserId, hasMore, loadMore };
};