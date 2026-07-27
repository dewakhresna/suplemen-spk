import { MapPin, Bed, Bath, Ruler, CheckCircle2, ShieldCheck } from "lucide-react";
import { HouseData } from "./useDetailHouse";

// Helper Format Rupiah
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR", 
    minimumFractionDigits: 0 
  }).format(angka);
};

export default function HouseInfo({ house }: { house: HouseData }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Header Info */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg">Tingkat Keamanan: Skor {house.c3_keamanan}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {house.nama}
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-4">
          {formatRupiah(house.c1_harga)}
        </p>
        <p className="flex items-center gap-2 text-slate-500 mt-3 text-lg">
          <MapPin size={20} className="text-blue-500 shrink-0" />
          Jarak Akses: {house.c2_jarak} km
        </p>
      </div>

      {/* Box Spesifikasi Properti */}
      <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 p-6 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-200">
          <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
            <Bed size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {house.HouseDetail?.beds || "-"}
          </span>
          <span className="text-sm text-slate-500">Kamar Tidur</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-200">
          <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
            <Bath size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {house.HouseDetail?.baths || "-"}
          </span>
          <span className="text-sm text-slate-500">Kamar Mandi</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
            <Ruler size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {house.c4_luas} <span className="text-sm font-medium">m²</span>
          </span>
          <span className="text-sm text-slate-500">Luas Tanah</span>
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Deskripsi Properti</h3>
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
          {house.HouseDetail?.description || "Deskripsi tidak tersedia untuk properti ini."}
        </p>
      </div>
    </div>
  );
}