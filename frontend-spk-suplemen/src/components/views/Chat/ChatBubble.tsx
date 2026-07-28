import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import instance from "@/libs/axios/instance";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  Chip,
} from "@heroui/react";
import { Heart, Eye, Sparkles, ShoppingCart } from "lucide-react";
import Link from "next/link";
import environment from "@/config/environment";

const formatRupiah = (angka: any) => {
  const validAngka = Number(angka);

  if (isNaN(validAngka) || validAngka === 0) {
    return "Harga tidak tersedia";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(validAngka);
};

const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath || imagePath === "") {
    return "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};

function ChatSuplemenCard({
  suplemen,
  currentUserId,
  index,
}: {
  suplemen: any;
  currentUserId: number | null;
  index: number;
}) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(suplemen.isFavorite || false);
  const [favoriteId, setFavoriteId] = useState<number | null>(suplemen.favoriteId || null);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  useEffect(() => {
    setIsFavorite(suplemen.isFavorite || false);
    setFavoriteId(suplemen.favoriteId || null);
  }, [suplemen.isFavorite, suplemen.favoriteId]);

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menyimpan suplemen favorit Anda.");
      router.push("/auth/login");
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

      window.dispatchEvent(new Event("favoriteChanged"));
    } catch (error) {
      console.error("Gagal mengubah status favorit:", error);
      alert("Terjadi kesalahan jaringan saat menyimpan favorit.");
    } finally {
      setIsLoadingFav(false);
    }
  };

  const imageUrl = suplemen.imageUrl || suplemen.SuplemenDetail?.image_1;
  const productLink = suplemen.link || suplemen.SuplemenDetail?.link || "#";

  return (
    <Card className="w-full bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl group">
      
      <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
        <Image
          src={getImageUrl(imageUrl)}
          alt={suplemen.nama || suplemen.title || "Suplemen Premium"}
          removeWrapper
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out rounded-none p-4"
        />
        
        {suplemen.skor && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-red-600/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-md shadow-red-900/20">
            <Sparkles size={12} className="text-amber-300" />
            Skor AI: {Number(suplemen.skor).toFixed(2)}
          </div>
        )}
        
        <div className="absolute top-3 left-3 z-10">
          <Chip size="sm" className="bg-white/90 backdrop-blur text-slate-700 font-bold shadow-sm uppercase tracking-wider text-[10px]">
            {suplemen.kategori || "Rekomendasi"}
          </Chip>
        </div>
      </div>

      <CardBody className="p-4 flex flex-col gap-1.5 bg-white relative z-20">
        <h4 className="font-bold text-slate-900 text-base leading-tight line-clamp-1 group-hover:text-red-700 transition-colors">
          {suplemen.nama || suplemen.title}
        </h4>
        <p className="text-red-700 font-extrabold text-lg">
          {formatRupiah(suplemen.c1_harga || suplemen.harga)}
        </p>
        <p className="text-sm text-slate-500 line-clamp-2 mt-1 min-h-[40px]">
          {suplemen.deskripsi || suplemen.description || suplemen.SuplemenDetail?.description || "Suplemen premium yang diformulasikan khusus untuk mendukung kesehatan dan performa harian Anda."}
        </p>
      </CardBody>

      <CardFooter className="px-4 pb-4 pt-0 flex flex-col gap-2.5 bg-white relative z-20">
        
        <div className="flex w-full items-center gap-2">
          <Button
            as="a"
            href={productLink}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="bordered"
            className="font-bold flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600 transition-colors"
            startContent={<ShoppingCart size={16} />}
          >
            Klik Sekarang
          </Button>
          
          <Button
            isIconOnly
            size="sm"
            variant={isFavorite ? "solid" : "bordered"}
            color="danger"
            onPress={handleFavoriteClick}
            isLoading={isLoadingFav}
            className={`rounded-xl shrink-0 transition-all duration-300 ${
              isFavorite
                ? "bg-red-500 text-white shadow-md shadow-red-500/30 border-none"
                : "border-red-200 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600"
            }`}
            aria-label="Tambah ke Favorit"
          >
            {!isLoadingFav && (
              <Heart size={16} className={isFavorite ? "fill-current scale-110" : "hover:scale-110 transition-transform"} />
            )}
          </Button>
        </div>

        <Button
          as={Link}
          href={`/suplemens/${suplemen.id || index}`}
          size="sm"
          className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
          endContent={<Eye size={16} />}
        >
          Lihat Detail
        </Button>
        
      </CardFooter>
    </Card>
  );
}

export default function ChatBubble({
  message,
  currentUserId,
}: {
  message: any;
  currentUserId: number | null;
}) {
  const isUser = message.role === "user";

  const recommendedItems = message.suplemens || message.products || message.houses || [];

  return (
    <div
      className={`flex items-start gap-3 max-w-[95%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "self-end flex-row-reverse" : ""
      }`}
    >
      {/* Avatar AI Consultant */}
      {!isUser && (
        <Avatar
          icon={<Sparkles size={18} />}
          classNames={{
            base: "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md mt-1 shrink-0",
          }}
          size="sm"
        />
      )}

      {/* Bubble Container */}
      <div
        className={`p-3.5 text-sm shadow-sm flex flex-col gap-3 transition-all ${
          isUser
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl rounded-tr-sm shadow-red-900/10"
            : "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm shadow-slate-200/40"
        }`}
      >
        {/* Pesan Pembuka */}
        {message.text && <p className="leading-relaxed">{message.text}</p>}

        {/* Daftar Card Rekomendasi Suplemen */}
        {recommendedItems.length > 0 && (
          <div className="flex flex-col gap-4 my-2 w-[280px] sm:w-[320px]">
            {recommendedItems.map((suplemen: any, index: number) => (
              <ChatSuplemenCard
                key={index}
                suplemen={suplemen}
                currentUserId={currentUserId}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Pesan Penutup */}
        {message.outroText && (
          <p className="leading-relaxed border-t border-slate-100/20 pt-3 text-slate-600 mt-1 text-xs">
            {message.outroText}
          </p>
        )}
      </div>
    </div>
  );
}