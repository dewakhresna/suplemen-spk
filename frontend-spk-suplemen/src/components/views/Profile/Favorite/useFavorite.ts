import { useState, useEffect, useCallback } from "react";
import instance from "@/libs/axios/instance";

export interface FavoriteSuplemenData {
  id: number;
  user_id: number;
  suplemen_id: number;
  Suplemen: {
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
  };
}

export const useFavoriteSuplemen = () => {
  const [favorites, setFavorites] = useState<FavoriteSuplemenData[]>([]);
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

      // Pastikan backend favorit sudah di-set untuk memanggil data beserta Suplemen
      const favRes = await instance.get(`/favorites?userId=${userId}`);
      setFavorites(favRes.data.data);
    } catch (err: any) {
      console.error("Error fetching favorites:", err);
      setError("Gagal memuat daftar produk favorit. Silakan coba lagi nanti.");
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
      alert("Terjadi kesalahan jaringan saat menghapus favorit.");
    }
  };

  return { favorites, isLoading, error, removeFavorite };
};