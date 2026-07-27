"use client";

import environment from "@/config/environment";
import { Card, CardBody, CardFooter, Image, Button, Skeleton } from "@heroui/react";
import { MapPin, Bed, Bath, Ruler, MessageCircle, Trash2, Home, AlertCircle } from "lucide-react";
import { useFavorite, FavoriteHouseData } from "./useFavorite";
import { useRouter } from "next/navigation";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath || imagePath === "") {
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};


function FavoriteHouseCard({ 
  favData, 
  onRemove 
}: { 
  favData: FavoriteHouseData; 
  onRemove: (id: number) => void 
}) {
  const router = useRouter();
  
  const house = favData.House;
  const imageUrl = getImageUrl(house.HouseDetail?.image_1);
  const beds = house.HouseDetail?.beds || 0;
  const baths = house.HouseDetail?.baths || 0;

  return (
    <Card className="group border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <CardBody className="p-0 overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={house.nama}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl rounded-b-none"
        />
      </CardBody>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-blue-600">
          {formatRupiah(house.c1_harga)}
        </h3>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 truncate">
            {house.nama}
          </h4>
          <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
            <MapPin size={16} className="text-blue-500 shrink-0" /> 
            <span className="truncate">Kota Bekasi</span>
          </p>
        </div>
        
        {/* Property Details */}
        <div className="flex items-center gap-4 border-t border-slate-100 pt-4 mt-2">
          <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
            <Bed size={18} className="text-slate-400" /> {beds}
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
            <Bath size={18} className="text-slate-400" /> {baths}
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
            <Ruler size={18} className="text-slate-400" /> {house.c4_luas}m²
          </div>
        </div>
      </div>
      <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
        <Button 
          onPress={() => router.push(`/listings/${house.id}`)}
          className="flex-1 bg-blue-600 text-white font-medium rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700"
          startContent={<MessageCircle size={18} />}
        >
          Lihat Detail
        </Button>
        <Button 
          isIconOnly
          variant="flat"
          color="danger"
          onPress={() => onRemove(favData.id)} // Memanggil API Delete melalui id tabel favorite
          className="rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function FavoriteList() {
  const { favorites, isLoading, error, removeFavorite } = useFavorite();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Rumah Favorit</h2>
        <p className="text-slate-500 mt-1">Properti yang Anda simpan untuk dilihat nanti.</p>
      </div>

      {/* STATE LOADING */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full space-y-5 p-4 rounded-2xl shadow-sm border-none bg-white">
              <Skeleton className="rounded-xl">
                <div className="h-56 rounded-xl bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3 mt-4">
                <Skeleton className="w-2/5 rounded-lg"><div className="h-6 w-2/5 rounded-lg"></div></Skeleton>
                <Skeleton className="w-full rounded-lg"><div className="h-4 w-full rounded-lg"></div></Skeleton>
                <Skeleton className="w-4/5 rounded-lg"><div className="h-4 w-4/5 rounded-lg"></div></Skeleton>
              </div>
            </Card>
          ))}
        </div>
      ) 
      
      /* STATE ERROR */
      : error ? (
        <div className="w-full bg-red-50 rounded-2xl border border-red-100 p-10 flex flex-col items-center justify-center text-center shadow-sm mt-4">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-5">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Terjadi Kesalahan</h3>
          <p className="text-red-600 font-medium max-w-md">{error}</p>
        </div>
      ) 
      
      /* STATE KOSONG */
      : !favorites || favorites.length === 0 ? (
        <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm py-24 px-6 flex flex-col items-center justify-center text-center mt-4">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Home size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Belum Ada Favorit
          </h3>
          <p className="text-slate-500 text-base max-w-md mb-8 leading-relaxed">
            Anda belum menambahkan properti ke daftar favorit. Silakan jelajahi katalog kami untuk menemukan rumah impian Anda.
          </p>
        </div>
      ) 
      
      /* STATE SUKSES */
      : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((favData) => (
            <FavoriteHouseCard 
              key={favData.id} 
              favData={favData} 
              onRemove={removeFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
}