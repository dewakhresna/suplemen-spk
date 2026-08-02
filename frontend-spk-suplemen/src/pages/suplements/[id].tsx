import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import SuplemenDetailContainer from "@/components/views/DetailSuplemen/SuplemenDetailContainer";
import environment from "@/config/environment";

export default function SuplemenDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>Detail Suplemen | Vital Prime</title>
        <link rel="icon" href={`${baseUrl}/uploads/logo-vitalprime.png`} type="image/png"></link>
      </Head>

    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow pt-8 pb-20">
        {router.isReady ? (
          <SuplemenDetailContainer id={id} />
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-slate-500">Menyiapkan halaman...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
    </>
  );
}