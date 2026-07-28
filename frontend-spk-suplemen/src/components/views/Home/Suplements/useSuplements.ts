import { useState, useEffect, useCallback } from "react";
import instance from "@/libs/axios/instance";

export interface SuplemenData {
  id: number;
  nama: string;
  c1_harga: number;
  c2_ulasan_negatif: number;
  c3_kandungan_nutrisi: number;
  c4_efektivitas_manfaat: number;
  SuplemenDetail?: {
    description: string | null;
    image_1: string | null;
    rating: number | null;
    rater: number | null;
  };
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export const useSuplemens = () => {
  const [suplemens, setSuplemens] = useState<SuplemenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchSuplemens = useCallback(async (currentPage: number, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const suplemensRes = await instance.get(`/suplemen?page=${currentPage}&limit=${limit}`);
      
      const fetchedData = suplemensRes.data.data.rows || suplemensRes.data.data || [];
      let suplemensData: SuplemenData[] = fetchedData;

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
          favoriteMap.set(fav.suplemen_id, fav.id);
        });

        suplemensData = suplemensData.map((suplemen) => ({
          ...suplemen,
          isFavorite: favoriteMap.has(suplemen.id),
          favoriteId: favoriteMap.get(suplemen.id) || null,
        }));
      }

      if (isLoadMore) {
        setSuplemens((prev) => [...prev, ...suplemensData]);
      } else {
        setSuplemens(suplemensData);
      }

    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data suplemen. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentUserId, limit]);

  useEffect(() => {
    fetchSuplemens(1, false);
  }, [fetchSuplemens]);

  const refreshFavoritesOnly = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const favRes = await instance.get(`/favorites?userId=${currentUserId}`);
      const userFavorites = favRes.data.data;
      const favoriteMap = new Map<number, number>(
        userFavorites.map((fav: any) => [fav.suplemen_id, fav.id])
      );

      setSuplemens((prevSuplemens) => 
        prevSuplemens.map(suplemen => ({
          ...suplemen,
          isFavorite: favoriteMap.has(suplemen.id),
          favoriteId: (favoriteMap.get(suplemen.id) as number) || null 
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
    fetchSuplemens(nextPage, true);
  };

  return { suplemens, isLoading, isLoadingMore, error, currentUserId, hasMore, loadMore };
};