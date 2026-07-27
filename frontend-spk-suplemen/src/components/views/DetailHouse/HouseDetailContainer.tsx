import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import HouseCarousel from "./HouseCarousel";
import HouseInfo from "./HouseInfo";
import ContactCard from "./ContactCard";
import { useDetailHouse } from "./useDetailHouse"; 

export default function HouseDetailContainer({ id }: { id: string | string[] | undefined }) {

  const { house, isLoading, error, currentUserId } = useDetailHouse(id as string);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-xl font-semibold text-slate-500">Memuat data properti...</p>
      </div>
    );
  }

  if (error || !house) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-xl font-semibold text-red-500">{error || "Properti tidak ditemukan."}</p>
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Kembali ke Pencarian
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{house.nama} | EstatePrime</title>
        <meta 
          name="description" 
          content={house.HouseDetail?.description?.substring(0, 150) || "Detail properti idaman Anda."} 
        />
      </Head>

      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Kembali ke Pencarian
          </Link>
        </div>

        <div className="mb-10 lg:mb-12">
          <HouseCarousel houseDetail={house.HouseDetail} /> 
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 relative">
          
          <div className="w-full lg:w-[65%]">
            <HouseInfo house={house} />
          </div>

          <aside className="w-full lg:w-[35%]">
            <ContactCard 
              houseId={house.id}
              contact={house.HouseDetail?.contact} 
              contactName={house.HouseDetail?.contact_name} 
              currentUserId={currentUserId}
              initialIsFavorite={house.isFavorite}
              initialFavoriteId={house.favoriteId}
            />
          </aside>

        </div>
      </div>
    </>
  );
}