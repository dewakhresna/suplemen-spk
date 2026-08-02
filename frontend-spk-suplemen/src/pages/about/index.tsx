import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import About from "@/components/views/Home/About/About";
import environment from "@/config/environment"; 

export default function AboutPage() {
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>About | Vital Prime</title>
        <link rel="icon" href={`${baseUrl}/uploads/logo-vitalprime.png`} type="image/png"></link>
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow pt-8 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <About />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}