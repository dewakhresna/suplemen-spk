import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import Suplements from "@/components/views/Home/Suplements/Suplements"; 

export default function SuplementsPage() {
  return (
    <>
      <Head>
        <title>Daftar Properti | EstatePrime</title>
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow pt-8 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <Suplements />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}