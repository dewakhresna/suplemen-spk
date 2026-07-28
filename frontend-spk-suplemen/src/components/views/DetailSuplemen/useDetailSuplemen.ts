import { useState, useEffect } from "react";
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
    image_2: string | null;
    image_3: string | null;
    rating: number | null;
    rater: number | null;
    link: string | null;      
    store_name: string | null; 
  };
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export const useDetailSuplemen = (id: string | number | undefined) => {
  const [suplemen, setSuplemen] = useState<SuplemenData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSuplemenDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await instance.get(`/suplemen/${id}`);
        let suplemenData: SuplemenData = response.data.data;

        let userId = null;
        try {
          const authRes = await instance.get("/auth/me");
          userId = authRes.data?.data?.id || authRes.data?.id; 
          setCurrentUserId(userId);
        } catch (authErr) {
          console.log("Pengguna belum login (Guest Mode)");
        }

        if (userId) {
          const favRes = await instance.get(`/favorites?userId=${userId}`);
          const userFavorites = favRes.data.data;

          const favoriteRecord = userFavorites.find((fav: any) => fav.suplemen_id === suplemenData.id);

          suplemenData = {
            ...suplemenData,
            isFavorite: !!favoriteRecord, 
            favoriteId: favoriteRecord ? favoriteRecord.id : null,
          };
        }

        setSuplemen(suplemenData);
      } catch (err: any) {
        console.error("Error fetching detail suplemen:", err);
        setError("Gagal mengambil data detail suplemen. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuplemenDetail();
  }, [id]);

  return { suplemen, isLoading, error, currentUserId };
};