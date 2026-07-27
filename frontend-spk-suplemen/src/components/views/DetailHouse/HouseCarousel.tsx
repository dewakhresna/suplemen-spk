import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import environment from "@/config/environment";

interface CarouselProps {
  houseDetail?: {
    image_1?: string | null;
    image_2?: string | null;
    image_3?: string | null;
  };
}

const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath || imagePath === "") {
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"; 
  }
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
};

export default function HouseCarousel({ houseDetail }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: string[] = [];
  if (houseDetail?.image_1) images.push(houseDetail.image_1);
  if (houseDetail?.image_2) images.push(houseDetail.image_2);
  if (houseDetail?.image_3) images.push(houseDetail.image_3);

  if (images.length === 0) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
        <p className="font-medium">Tidak ada gambar tersedia</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg group">
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img 
            key={idx} 
            src={getImageUrl(img)} 
            alt={`House Image ${idx + 1}`} 
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Navigasi dan Indikator tetap sama seperti kode Anda sebelumnya */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button isIconOnly radius="full" variant="flat" className="bg-white/70 backdrop-blur-md text-slate-800 hover:bg-white" onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}>
            <ChevronLeft size={24} />
          </Button>
          <Button isIconOnly radius="full" variant="flat" className="bg-white/70 backdrop-blur-md text-slate-800 hover:bg-white" onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}>
            <ChevronRight size={24} />
          </Button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${currentIndex === idx ? "w-8 h-2.5 bg-blue-600 shadow-md" : "w-2.5 h-2.5 bg-white/70 hover:bg-white"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}