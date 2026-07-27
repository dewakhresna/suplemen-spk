import { useState, useEffect, useCallback } from "react";
import instance from "@/libs/axios/instance";

export interface FavoriteHouseData {
  id: number;
  user_id: number;
  house_id: number;
  House: {
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
  };
}

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<FavoriteHouseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const authRes = await instance.get("/auth/me");
      const userId = authRes.data?.data?.id || authRes.data?.id;

      if (!userId) {
        setError("Sesi Anda telah berakhir. Silakan login kembali.");
        setIsLoading(false);
        return;
      }

      const favRes = await instance.get(`/favorites?userId=${userId}`);
      setFavorites(favRes.data.data);
    } catch (err: any) {
      console.error("Error fetching favorites:", err);
      setError("Gagal memuat daftar favorit. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFavorite = async (favoriteId: number) => {
    try {
      await instance.delete(`/favorites/${favoriteId}`);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
      alert("Terjadi kesalahan saat menghapus favorit.");
    }
  };

  return { favorites, isLoading, error, removeFavorite };
};