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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Filter,
  Home,
  AlertCircle,
  Heart,
} from "lucide-react";
import { useListing, HouseData } from "./useListing";
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
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl =
    environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};

function HouseCard({
  house,
  currentUserId,
}: {
  house: HouseData;
  currentUserId: number | null;
}) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(house.isFavorite || false);
  const [favoriteId, setFavoriteId] = useState<number | null>(
    house.favoriteId || null,
  );
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  const imageUrl = getImageUrl(house.HouseDetail?.image_1);
  const description =
    house.HouseDetail?.description || "Deskripsi properti tidak tersedia.";
  const beds = house.HouseDetail?.beds || 0;
  const baths = house.HouseDetail?.baths || 0;

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      alert(
        "Silakan login terlebih dahulu untuk menyimpan properti impian Anda.",
      );
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
          house_id: house.id,
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
    <Card className="group flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-t-2xl">
        <Image
          src={imageUrl}
          alt={house.nama}
          removeWrapper
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-none"
        />
      </div>

      <CardBody className="p-5 flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-blue-600 mb-1">
          {formatRupiah(house.c1_harga)}
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 truncate">
          {house.nama}
        </h4>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
          <MapPin size={16} className="text-blue-500 shrink-0" /> Kota Bekasi
        </p>

        <p className="text-sm text-slate-600 line-clamp-2 mt-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Bed size={18} className="text-slate-400 shrink-0" /> {beds} Beds
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Bath size={18} className="text-slate-400 shrink-0" /> {baths} Baths
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Maximize size={18} className="text-slate-400 shrink-0" />{" "}
            {house.c4_luas} m²
          </div>
        </div>
      </CardBody>

      <CardFooter className="px-5 pb-5 pt-0 flex items-center gap-3">
        <Button
          isIconOnly
          variant="bordered"
          onPress={handleFavoriteClick}
          isLoading={isLoadingFav}
          className={`shrink-0 rounded-xl transition-all duration-300 h-12 w-12 ${
            isFavorite
              ? "border-red-200 bg-red-50 text-red-500 shadow-sm"
              : "border-slate-200 text-slate-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {!isLoadingFav && (
            <Heart size={20} className={isFavorite ? "fill-current" : ""} />
          )}
        </Button>

        <Button
          onPress={() => router.push(`/listings/${house.id}`)}
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ListingGrid() {
  const {
    houses,
    isLoading,
    isLoadingMore,
    error,
    currentUserId,
    hasMore,
    loadMore,
  } = useListing();

  const districts = [
    "Bekasi Timur",
    "Bekasi Barat",
    "Bekasi Selatan",
    "Bekasi Utara",
    "Rawalumbu",
    "Pondok Gede",
    "Jatiasih",
    "Mustikajaya",
  ];

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Available Properties
          </h2>
          <p className="text-slate-500 mt-2 text-base">
            Discover your dream home from our latest property listings.
          </p>
        </div>

        <Popover placement="bottom-end" showArrow offset={8}>
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="h-12 px-6 rounded-xl border-slate-200 text-slate-700 bg-white shadow-sm hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-medium"
            >
              <Filter
                size={18}
                className="mr-2 text-slate-500 group-hover:text-blue-600"
              />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-5 rounded-2xl shadow-xl border border-slate-100 bg-white">
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 mb-1">
                Filter by District
              </label>
              <Select
                placeholder="Select district"
                variant="bordered"
                classNames={{
                  trigger:
                    "h-12 rounded-xl border-slate-200 hover:border-blue-400 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300",
                  value: "text-slate-700 font-medium",
                }}
              >
                {districts.map((district) => (
                  <SelectItem key={district}>{district}</SelectItem>
                ))}
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="w-full border border-slate-100 bg-white rounded-2xl shadow-sm overflow-hidden p-0"
              >
                <Skeleton className="w-full aspect-video rounded-none" />
                <CardBody className="p-5 flex flex-col gap-3">
                  <Skeleton className="w-1/3 h-8 rounded-lg mt-1" />
                  <Skeleton className="w-3/4 h-5 rounded-lg mt-2" />
                  <Skeleton className="w-1/2 h-4 rounded-lg mt-1" />
                  <div className="mt-3 flex flex-col gap-2">
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-4/5 h-4 rounded-lg" />
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-4 mt-4">
                    <Skeleton className="w-16 h-5 rounded-md" />
                    <Skeleton className="w-16 h-5 rounded-md" />
                    <Skeleton className="w-16 h-5 rounded-md" />
                  </div>
                </CardBody>
                <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <Skeleton className="flex-1 h-12 rounded-xl" />
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
              Something went wrong
            </h3>
            <p className="text-red-600 font-medium max-w-md">
              Unable to load property data. {error}
            </p>
          </div>
        ) : !houses || houses.length === 0 ? (
          <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm py-24 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Home size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              No Properties Available
            </h3>
            <p className="text-slate-500 text-base max-w-md mb-8 leading-relaxed">
              There are currently no properties matching your search. Please
              check back later or try adjusting your filters.
            </p>
            <Button
              variant="bordered"
              color="primary"
              className="h-12 px-8 rounded-xl border-blue-200 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300"
              onPress={() => window.location.reload()}
            >
              Refresh Listings
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map((house) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  currentUserId={currentUserId}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="flat"
                  color="primary"
                  size="lg"
                  isLoading={isLoadingMore}
                  onPress={loadMore}
                  className="font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-10 rounded-xl transition-all duration-300"
                >
                  {isLoadingMore
                    ? "Memuat Properti..."
                    : "Tampilkan Lebih Banyak"}
                </Button>
              </div>
            )}

            {!hasMore && houses.length > 0 && (
              <div className="flex items-center justify-center gap-3 text-slate-400 text-sm font-medium mt-4">
                <span className="h-[1px] w-12 bg-slate-200"></span>
                Semua properti telah ditampilkan
                <span className="h-[1px] w-12 bg-slate-200"></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
