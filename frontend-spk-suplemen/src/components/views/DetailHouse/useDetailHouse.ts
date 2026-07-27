import { useState, useEffect } from "react";
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
    contact: string | null;      
    contact_name: string | null;  
  };
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export const useDetailHouse = (id: string | number | undefined) => {
  const [house, setHouse] = useState<HouseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchHouseDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await instance.get(`/houses/${id}`);
        let houseData: HouseData = response.data.data;

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

          const favoriteRecord = userFavorites.find((fav: any) => fav.house_id === houseData.id);

          houseData = {
            ...houseData,
            isFavorite: !!favoriteRecord, 
            favoriteId: favoriteRecord ? favoriteRecord.id : null,
          };
        }

        setHouse(houseData);
      } catch (err: any) {
        console.error("Error fetching detail house:", err);
        setError("Gagal mengambil data detail properti. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseDetail();
  }, [id]);

  return { house, isLoading, error, currentUserId };
};