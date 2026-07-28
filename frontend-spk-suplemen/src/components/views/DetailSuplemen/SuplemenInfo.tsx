import { ShieldCheck, Activity, Star, ThumbsDown } from "lucide-react";
import { SuplemenData } from "./useDetailSuplemen";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR", 
    minimumFractionDigits: 0 
  }).format(angka);
};

export default function SuplemenInfo({ suplemen }: { suplemen: SuplemenData }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100 flex items-center gap-1">
            <ShieldCheck size={16} /> 
            Produk Terverifikasi
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-600 text-sm font-bold rounded-lg border border-amber-100 flex items-center gap-1">
            <Star size={16} className="fill-current" /> 
            {suplemen.SuplemenDetail?.rating || 0} / 5
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {suplemen.nama}
        </h1>
        
        <p className="text-2xl md:text-3xl font-black text-red-600 mt-4">
          {formatRupiah(suplemen.c1_harga)}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 p-6 rounded-3xl shadow-sm">
        
        <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-200">
          <div className="p-3 bg-white rounded-xl shadow-sm shadow-amber-500/10 text-amber-500">
            <Activity size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {suplemen.c3_kandungan_nutrisi} <span className="text-sm font-medium">Skor</span>
          </span>
          <span className="text-sm font-medium text-slate-500 text-center">Kandungan Nutrisi</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-200">
          <div className="p-3 bg-white rounded-xl shadow-sm shadow-red-500/10 text-red-500">
            <ShieldCheck size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {suplemen.c4_efektivitas_manfaat} <span className="text-sm font-medium">Skor</span>
          </span>
          <span className="text-sm font-medium text-slate-500 text-center">Efektivitas Manfaat</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-white rounded-xl shadow-sm shadow-slate-500/10 text-slate-400">
            <ThumbsDown size={24} />
          </div>
          <span className="text-lg font-bold text-slate-800">
            {suplemen.c2_ulasan_negatif} <span className="text-sm font-medium">%</span>
          </span>
          <span className="text-sm font-medium text-slate-500 text-center">Ulasan Negatif</span>
        </div>
        
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
          Deskripsi Produk
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
          {suplemen.SuplemenDetail?.description || "Deskripsi tidak tersedia untuk suplemen ini."}
        </p>
      </div>
      
    </div>
  );
}