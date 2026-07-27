"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Avatar, Button, Divider } from "@heroui/react";
import { MessageSquare, Heart } from "lucide-react";
import instance from "@/libs/axios/instance";

interface ContactCardProps {
  houseId?: number;
  contact?: string | null;
  contactName?: string | null;
  currentUserId?: number | null;
  initialIsFavorite?: boolean;
  initialFavoriteId?: number | null;
}

export default function ContactCard({ 
  houseId,
  contact, 
  contactName, 
  currentUserId,
  initialIsFavorite = false,
  initialFavoriteId = null
}: ContactCardProps) {
  
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favoriteId, setFavoriteId] = useState<number | null>(initialFavoriteId);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  const formatWhatsAppLink = (number?: string | null) => {
    if (!number) return "#";
    let formattedNumber = number.replace(/\D/g, ""); 
    if (formattedNumber.startsWith("0")) {
      formattedNumber = "62" + formattedNumber.substring(1);
    }
    return `https://wa.me/${formattedNumber}`;
  };

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menyimpan properti impian Anda.");
      router.push("/auth/login");
      return;
    }

    if (!houseId) return;

    setIsLoadingFav(true);

    try {
      if (isFavorite && favoriteId) {
        await instance.delete(`/favorites/${favoriteId}`);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const response = await instance.post("/favorites/create", {
          user_id: currentUserId,
          house_id: houseId,
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
    <Card className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
      <CardBody className="p-6 md:p-8 flex flex-col gap-6">
        
        {/* Agent Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar 
              showFallback 
              name={contactName || "A P"} 
              size="lg" 
              className="w-16 h-16 border-2 border-blue-50 text-blue-600 bg-blue-100 font-bold" 
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Agen Properti</p>
            <h4 className="text-lg font-bold text-slate-900 leading-tight">
              {contactName || "Agen EstatePrime"}
            </h4>
            <p className="text-sm text-blue-600 font-medium">Verified Agent</p>
          </div>
        </div>

        <Divider className="bg-slate-100" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button 
            as="a"
            href={formatWhatsAppLink(contact)}
            target="_blank"
            rel="noopener noreferrer"
            color="primary" 
            size="lg"
            className="w-full bg-blue-600 font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-transform"
            startContent={<MessageSquare size={18} />}
          >
            Chat Sekarang
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant={isFavorite ? "solid" : "flat"} 
              color="danger"
              size="lg"
              onPress={handleFavoriteClick}
              isLoading={isLoadingFav}
              className={`w-full rounded-xl shrink-0 transition-colors ${
                isFavorite 
                  ? "bg-red-500 text-white hover:bg-red-600" 
                  : "bg-red-50 text-red-500 hover:bg-red-100"
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