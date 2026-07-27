import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar";
import HeroSection from "@/components/views/Home/HeroSection";
import ListingGrid from "@/components/views/Home/House/ListingGrid";
import LiveChat from "@/components/views/Chat/LiveChat";
import Footer from "@/components/views/Home/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>EstatePrime | Find Your Dream Home</title>
        <meta
          name="description"
          content="Browse thousands of premium real estate listings with live chat support."
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
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                      Featured Listings
                    </h2>
                    <p className="text-slate-500 mt-2">
                      Explore our hand-picked properties for you.
                    </p>
                  </div>
                </div>
                <ListingGrid />
              </div>

              <aside className="w-full lg:w-[30%] order-1 lg:order-2">
                <LiveChat />
              </aside>
            </div>
          </section>
        </main>
        <Footer /> {/* <-- Pasang Footer di sini */}
      </div>
    </>
  );
}
