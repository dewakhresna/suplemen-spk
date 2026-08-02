"use client";

import environment from "@/config/environment";
import { Card, CardBody, CardFooter, Image, Button, Skeleton } from "@heroui/react";
import { Star, Eye, HeartOff, ShoppingBag, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFavoriteSuplemen, FavoriteSuplemenData } from "./useFavorite";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath || imagePath === "") {
    return "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};


function FavoriteSuplemenCard({ 
  favData, 
  onRemove 
}: { 
  favData: FavoriteSuplemenData; 
  onRemove: (id: number) => void 
}) {
  const router = useRouter();
  
  const product = favData.Suplemen;
  const imageUrl = getImageUrl(product.SuplemenDetail?.image_1);
  const rating = product.SuplemenDetail?.rating || 0;
  const rater = product.SuplemenDetail?.rater || 0;
  const description = product.SuplemenDetail?.description || "Deskripsi produk tidak tersedia.";

  return (
    <Card className="group relative border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1.5 transition-all duration-500 ease-out bg-white overflow-hidden flex flex-col h-full">
      
      {/* Product Image Area */}
      <CardBody className="p-0 overflow-hidden relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center h-64 sm:h-72 shrink-0">
        <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        <Image
          src={imageUrl}
          alt={product.nama}
          removeWrapper
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out relative z-10 rounded-none"
        />
      </CardBody>
      
      {/* Product Information */}
      <div className="p-5 sm:p-6 flex flex-col gap-3 flex-grow bg-white relative z-20">
        
        {/* Price & Rating Row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-2xl font-extrabold text-red-700 tracking-tight">
            {formatRupiah(product.c1_harga)}
          </h3>
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/50">
            <Star size={14} className="text-amber-500" fill="currentColor" />
            <span className="text-amber-700 font-bold text-sm">
              {rating}
            </span>
            <span className="text-amber-600/60 font-medium text-xs">
              ({rater})
            </span>
          </div>
        </div>
        
        {/* Title */}
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-red-700 transition-colors duration-300 mt-2">
            {product.nama}
          </h4>
        </div>
        
        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mt-auto pt-2 border-t border-slate-50 min-h-[44px]">
          {description}
        </p>
      </div>
      
      {/* Card Footer - Action Buttons */}
      <CardFooter className="px-5 pb-6 pt-0 flex gap-3 bg-white relative z-20 mt-auto">
        
        {/* Primary Button */}
        <Button 
          onPress={() => router.push(`/suplemens/${product.id}`)}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300"
          startContent={<Eye size={18} />}
        >
          Lihat Detail
        </Button>
        
        {/* Remove Button */}
        <Button 
          isIconOnly
          aria-label="Hapus dari Favorit"
          onPress={() => onRemove(favData.id)}
          className="shrink-0 bg-white border-2 border-red-100 text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-xl shadow-sm hover:shadow-md hover:shadow-red-600/30 transition-all duration-300 hover:scale-105"
        >
          <HeartOff size={18} />
        </Button>

      </CardFooter>
    </Card>
  );
}

export default function FavoriteList() {
  const { favorites, isLoading, error, removeFavorite } = useFavoriteSuplemen();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      
      {/* Header Area */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Produk Favorit
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          Simpan produk suplemen favorit Anda agar lebih mudah ditemukan kembali saat Anda membutuhkannya.
        </p>
      </div>

      {/* STATE LOADING */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full space-y-5 p-4 rounded-2xl shadow-sm border-none bg-white h-[400px]">
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
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
          <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 text-red-500 rounded-full mb-6 shadow-inner">
            <ShoppingBag size={56} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Belum Ada Produk Favorit
          </h3>
          <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
            Koleksi suplemen impian Anda masih kosong. Jelajahi katalog kami dan temukan nutrisi terbaik untuk dukung gaya hidup sehat Anda.
          </p>
          <Button 
            as={Link}
            href="/suplements"
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-2xl px-8 shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-300"
          >
            Jelajahi Produk
          </Button>
        </div>
      ) 
      
      /* STATE SUKSES */
      : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {favorites.map((favData) => (
            <FavoriteSuplemenCard 
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