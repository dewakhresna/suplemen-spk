import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar";
import HeroSection from "@/components/views/Home/HeroSection";
import Suplements from "@/components/views/Home/Suplements/Suplements";
import LiveChat from "@/components/views/Chat/LiveChat";
import Footer from "@/components/views/Home/Footer";
import environment from "@/config/environment";

export default function Home() {
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>Vital Prime | Find Your Suplement</title>
        <link rel="icon" href={`${baseUrl}/uploads/logo-vitalprime.png`} type="image/png"></link>
        <meta
          name="description"
          content="Browse hundreds of premium supplements with live chat support."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        {/* Wrapper flex-grow agar Footer selalu berada di bawah meskipun konten sedikit */}
        <main className="flex-grow">
          <HeroSection />

          <section className="container mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-[70%] order-2 lg:order-1">
                <Suplements />
              </div>

              <aside className="w-full lg:w-[30%] order-1 lg:order-2">
                <LiveChat />
              </aside>
            </div>
          </section>
        </main>
        <Footer /> 
      </div>
    </>
  );
}
