import { Button } from "@heroui/react";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-white to-slate-50 py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6 animate-fade-in">
          <ShieldCheck size={16} /> Formulasi yang 100% didukung secara ilmiah
        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
          Tingkatkan kesehatan Anda dengan <span className="text-red-600">Suplemen Premium</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Wujudkan tujuan kesehatan Anda dengan suplemen yang telah teruji secara klinis. Berikan asupan terbaik bagi tubuh, dan jalani gaya hidup yang lebih sehat.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as={Link}
            href="/suplements" 
            size="lg" 
            color="primary" 
            endContent={<ShoppingBag size={18} />}
            className="bg-red-600 px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl shadow-red-600/20 hover:scale-105 transition-all w-full sm:w-auto text-white"
          >
            Cari Suplemen
          </Button>
        </div>
      </div>
    </section>
  );
}