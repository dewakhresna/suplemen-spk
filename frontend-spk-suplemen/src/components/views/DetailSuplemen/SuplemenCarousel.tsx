import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import environment from "@/config/environment";

interface CarouselProps {
  detail?: {
    image_1?: string | null;
    image_2?: string | null;
    image_3?: string | null;
  };
}

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

export default function SuplemenCarousel({ detail }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: string[] = [];
  if (detail?.image_1) images.push(detail.image_1);
  if (detail?.image_2) images.push(detail.image_2);
  if (detail?.image_3) images.push(detail.image_3);

  if (images.length === 0) {
    images.push("");
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg shadow-red-900/5 border border-slate-100 group bg-gradient-to-br from-slate-50 to-slate-100">
      
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center p-4 sm:p-8">
            <img 
              src={getImageUrl(img)} 
              alt={`Gambar Suplemen ${idx + 1}`} 
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            isIconOnly 
            radius="full" 
            variant="flat" 
            className="bg-white/80 backdrop-blur-md text-red-600 hover:bg-white hover:text-red-700 shadow-md border border-red-50" 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button 
            isIconOnly 
            radius="full" 
            variant="flat" 
            className="bg-white/80 backdrop-blur-md text-red-600 hover:bg-white hover:text-red-700 shadow-md border border-red-50" 
            onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx 
                  ? "w-8 h-2.5 bg-gradient-to-r from-red-600 to-amber-500 shadow-md" 
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-red-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}