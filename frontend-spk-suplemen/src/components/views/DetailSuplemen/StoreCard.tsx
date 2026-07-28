"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, Divider } from "@heroui/react";
import { ShoppingCart, Heart, Store } from "lucide-react";
import instance from "@/libs/axios/instance";

interface StoreCardProps {
  suplemenId?: number;
  link?: string | null;
  storeName?: string | null;
  currentUserId?: number | null;
  initialIsFavorite?: boolean;
  initialFavoriteId?: number | null;
}

export default function StoreCard({ 
  suplemenId,
  link, 
  storeName, 
  currentUserId,
  initialIsFavorite = false,
  initialFavoriteId = null
}: StoreCardProps) {
  
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favoriteId, setFavoriteId] = useState<number | null>(initialFavoriteId);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menyimpan suplemen ini.");
      router.push("/auth/login");
      return;
    }

    if (!suplemenId) return;

    setIsLoadingFav(true);

    try {
      if (isFavorite && favoriteId) {
        await instance.delete(`/favorites/${favoriteId}`);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const response = await instance.post("/favorites/create", {
          user_id: currentUserId,
          suplemen_id: suplemenId,
        });

        setIsFavorite(true);
        setFavoriteId(response.data.data.id);
      }
    } catch (error) {
      console.error("Gagal mengubah status favorit:", error);
      alert("Terjadi kesalahan jaringan saat menyimpan favorit.");
    } finally {
      setIsLoadingFav(false);
    }
  };

  return (
    <Card className="w-full bg-white rounded-3xl shadow-xl shadow-red-900/5 border border-red-50 sticky top-28 overflow-hidden transition-all duration-300">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50 z-0"></div>

      <CardBody className="p-6 md:p-8 flex flex-col gap-6 relative z-10">
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3.5 bg-gradient-to-tr from-red-700 via-red-600 to-amber-500 rounded-2xl shadow-lg shadow-red-700/20 text-white">
              <Store size={28} strokeWidth={2} />
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-0.5">Toko Resmi</p>
            <h4 className="text-lg font-extrabold text-slate-900 leading-tight line-clamp-1">
              {storeName || "Suplemen Store"}
            </h4>
            <p className="text-sm text-red-600 font-semibold mt-0.5">Verified Seller</p>
          </div>
        </div>

        <Divider className="bg-slate-100" />

        <div className="flex flex-col gap-3">
          <Button 
            as="a"
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all duration-300 h-14"
            startContent={<ShoppingCart size={20} />}
          >
            Klik Sekarang
          </Button>
          
          <div className="flex gap-3 mt-1">
            <Button 
              variant={isFavorite ? "solid" : "bordered"} 
              size="lg"
              onPress={handleFavoriteClick}
              isLoading={isLoadingFav}
              className={`w-full rounded-xl shrink-0 transition-all duration-300 h-14 font-bold ${
                isFavorite 
                  ? "bg-red-500 text-white shadow-md shadow-red-500/30 border-none" 
                  : "bg-white text-red-500 border-2 border-red-100 hover:bg-red-50 hover:border-red-200"
              }`}
            >
              {!isLoadingFav && <Heart size={22} className={isFavorite ? "fill-current" : ""} />}
              {isFavorite ? "Hapus Favorit" : "Tambah Favorit"}
            </Button>
          </div>
        </div>

      </CardBody>
    </Card>
  );
}