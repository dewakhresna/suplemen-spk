import { useRouter } from "next/router";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import HouseDetailContainer from "@/components/views/DetailHouse/HouseDetailContainer";

export default function HouseDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow pt-8 pb-20">
        {/* Pastikan router sudah siap membaca ID sebelum merender Container */}
        {router.isReady ? (
          <HouseDetailContainer id={id} />
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-slate-500">Menyiapkan halaman...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}