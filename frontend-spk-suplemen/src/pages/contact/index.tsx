import Head from "next/head";
import Navbar from "@/components/views/Home/Navbar"; 
import Footer from "@/components/views/Home/Footer"; 
import Contact from "@/components/views/Home/Contact/Contact"; 

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | EstatePrime</title>
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow pt-8 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}