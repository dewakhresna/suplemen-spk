"use client";

import { useState } from "react";
import environment from "@/config/environment";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
} from "@heroui/react";
import {
  AlertCircle,
  Heart,
  Star,
  ArrowRight,
  HeartPulse
} from "lucide-react";
import { useSuplemens, SuplemenData } from "./useSuplements";
import { useRouter } from "next/navigation";
import instance from "@/libs/axios/instance";

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

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};

function SuplemenCard({
  suplemen,
  currentUserId,
}: {
  suplemen: SuplemenData;
  currentUserId: number | null;
}) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(suplemen.isFavorite || false);
  const [favoriteId, setFavoriteId] = useState<number | null>(suplemen.favoriteId || null);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  const imageUrl = getImageUrl(suplemen.SuplemenDetail?.image_1);
  const description = suplemen.SuplemenDetail?.description || "Deskripsi suplemen tidak tersedia.";
  const rating = suplemen.SuplemenDetail?.rating || 0;
  const rater = suplemen.SuplemenDetail?.rater || 0;

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menyimpan suplemen favorit Anda.");
      router.push("/login");
      return;
    }

    setIsLoadingFav(true);

    try {
      if (isFavorite && favoriteId) {
        await instance.delete(`/favorites/${favoriteId}`);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const response = await instance.post("/favorites/create", {
          user_id: currentUserId,
          suplemen_id: suplemen.id,
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
    <Card className="group border-none rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col h-full border border-slate-100">
      <CardBody className="p-0 overflow-hidden relative bg-slate-50 flex items-center justify-center h-64 shrink-0">
        <Image
          src={imageUrl}
          alt={suplemen.nama}
          removeWrapper
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl rounded-b-none mix-blend-multiply"
        />
      </CardBody>

      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-red-600 truncate mr-2">
            {formatRupiah(suplemen.c1_harga)}
          </h3>
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm shrink-0">
            <Star size={16} fill="currentColor" />
            {rating}{" "}
            <span className="text-slate-400 font-normal">
              ({rater})
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {suplemen.nama}
          </h4>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mt-1 min-h-[40px]">
          {description}
        </p>
      </div>

      <CardFooter className="px-5 pb-6 pt-0 gap-3 bg-white relative z-20 mt-auto">
        <Button
          className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 h-12"
          endContent={<ArrowRight size={18} />}
          onPress={() => router.push(`/suplements/${suplemen.id}`)}
        >
          Lihat Detail
        </Button>

        <Button
          isIconOnly
          isLoading={isLoadingFav}
          onPress={handleFavoriteClick}
          className={`shrink-0 border-2 rounded-xl h-12 w-12 transition-all duration-300 hover:scale-105 ${
            isFavorite
              ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
              : "bg-white border-red-100 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white shadow-sm"
          }`}
          aria-label="Tambah ke Favorit"
        >
          {!isLoadingFav && (
            <Heart
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
              className={isFavorite ? "scale-110 transition-transform" : "transition-transform"}
            />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SuplemenGrid() {
  const {
    suplemens,
    isLoading,
    isLoadingMore,
    error,
    currentUserId,
    hasMore,
    loadMore,
  } = useSuplemens();

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Katalog Suplemen
        </h2>
        <p className="text-slate-500 text-base">
          Temukan produk suplemen terbaik untuk mendukung target kebugaran Anda.
        </p>
      </div>

      <div className="w-full min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="w-full border border-slate-100 bg-white rounded-2xl shadow-sm overflow-hidden p-0 h-[450px]">
                <Skeleton className="w-full h-64 rounded-none" />
                <CardBody className="p-5 flex flex-col gap-3">
                  <Skeleton className="w-1/2 h-8 rounded-lg" />
                  <Skeleton className="w-3/4 h-6 rounded-lg mt-1" />
                  <Skeleton className="w-full h-10 rounded-lg mt-2" />
                </CardBody>
                <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
                  <Skeleton className="flex-1 h-12 rounded-xl" />
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="w-full bg-red-50 rounded-2xl border border-red-100 p-10 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-5">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-red-600 font-medium max-w-md">
              {error}
            </p>
          </div>
        ) : !suplemens || suplemens.length === 0 ? (
          <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm py-24 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <HeartPulse size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-slate-500 text-base max-w-md mb-8 leading-relaxed">
              Belum ada produk suplemen yang tersedia saat ini. Silakan kembali lagi nanti atau ubah filter pencarian Anda.
            </p>
            <Button
              variant="bordered"
              color="danger"
              className="h-12 px-8 rounded-xl border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
              onPress={() => window.location.reload()}
            >
              Muat Ulang Halaman
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {suplemens.map((suplemen) => (
                <SuplemenCard
                  key={suplemen.id}
                  suplemen={suplemen}
                  currentUserId={currentUserId}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="flat"
                  color="danger"
                  size="lg"
                  isLoading={isLoadingMore}
                  onPress={loadMore}
                  className="font-semibold bg-red-50 text-red-600 hover:bg-red-100 px-10 rounded-xl transition-all duration-300"
                >
                  {isLoadingMore ? "Memuat Produk..." : "Tampilkan Lebih Banyak"}
                </Button>
              </div>
            )}

            {!hasMore && suplemens.length > 0 && (
              <div className="flex items-center justify-center gap-3 text-slate-400 text-sm font-medium mt-4">
                <span className="h-[1px] w-12 bg-slate-200"></span>
                Semua produk telah ditampilkan
                <span className="h-[1px] w-12 bg-slate-200"></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}