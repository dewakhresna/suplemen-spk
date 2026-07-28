import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SuplemenCarousel from "./SuplemenCarousel";
import SuplemenInfo from "./SuplemenInfo";
import StoreCard from "./StoreCard"; 
import { useDetailSuplemen } from "./useDetailSuplemen"; 

export default function SuplemenDetailContainer({ id }: { id: string | string[] | undefined }) {
  const { suplemen, isLoading, error, currentUserId } = useDetailSuplemen(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-slate-500 animate-pulse">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  if (error || !suplemen) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[50vh]">
        <p className="text-xl font-bold text-red-600">{error || "Produk suplemen tidak ditemukan."}</p>
        <Link 
          href="/suplements" 
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          Kembali ke Suplemen
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{suplemen.nama} | HealthFuel</title>
        <meta 
          name="description" 
          content={suplemen.SuplemenDetail?.description?.substring(0, 150) || "Detail produk suplemen untuk kebutuhan nutrisi Anda."} 
        />
      </Head>

      <div className="container mx-auto px-4 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="mb-6">
          <Link 
            href="/suplements" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-500 font-bold hover:text-red-600 hover:bg-white hover:shadow-sm transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Suplemen
          </Link>
        </div>

        <div className="mb-10 lg:mb-12">
          <SuplemenCarousel detail={suplemen.SuplemenDetail} /> 
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 relative">
          
          <div className="w-full lg:w-[65%]">
            <SuplemenInfo suplemen={suplemen} />
          </div>

          <aside className="w-full lg:w-[35%] relative">
            <StoreCard 
              suplemenId={suplemen.id}
              link={suplemen.SuplemenDetail?.link} 
              storeName={suplemen.SuplemenDetail?.store_name} 
              currentUserId={currentUserId}
              initialIsFavorite={suplemen.isFavorite}
              initialFavoriteId={suplemen.favoriteId}
            />
          </aside>

        </div>
      </div>
    </>
  );
}