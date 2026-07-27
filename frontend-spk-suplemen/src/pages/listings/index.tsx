import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import ListingGrid from "@/components/views/Home/Listings/HouseCard"; 

// Ubah nama fungsi halaman agar tidak bentrok dengan komponen
export default function ListingsPage() {
  return (
    <>
      <Head>
        <title>Daftar Properti | EstatePrime</title>
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow pt-8 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Memanggil grid yang berisi daftar rumah */}
            <ListingGrid />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}