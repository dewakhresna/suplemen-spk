"use client";

import React from "react";
import { Button, Card, CardBody, Accordion, AccordionItem } from "@heroui/react";
import {
  Home,
  Target,
  Search,
  Award,
  CheckCircle,
  Zap,
  Heart,
  MessageSquare,
  MonitorSmartphone,
  MapPin,
  Shield,
  Maximize,
  Users,
  Map,
  Clock,
  Eye,
  Lightbulb,
  ArrowDown
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <HeroSection />
      <WhoWeAreSection />
      <MissionSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <DSSSection />
      <StatisticsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

const HeroSection = () => (
  <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-slate-50 rounded-b-3xl">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 shadow-sm">
      <Home size={16} /> Tentang Platform Kami
    </div>
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-tight">
      Temukan Rumah Impian Anda dengan <span className="text-blue-600">Percaya Diri</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
      Platform kami membantu pengguna menemukan properti terbaik melalui pengalaman pencarian yang intuitif dan sistem rekomendasi cerdas. Kami membuat pencarian rumah ideal Anda menjadi lebih mudah, lebih cepat, dan lebih terpercaya.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Button color="primary" size="lg" className="bg-blue-600 rounded-xl font-medium shadow-md shadow-blue-500/20 hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 h-14">
        Jelajahi Properti
      </Button>
      <Button variant="bordered" size="lg" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl font-medium hover:scale-105 transition-all duration-300 px-8 h-14">
        Hubungi Kami
      </Button>
    </div>
  </section>
);

const WhoWeAreSection = () => (
  <section className="px-6 py-20 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="relative rounded-3xl overflow-hidden shadow-xl h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
          alt="Rumah Residensial Modern"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-blue-900/10"></div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Siapa Kami</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Kami adalah platform rekomendasi properti premium yang dirancang untuk menyederhanakan perjalanan pembelian rumah. Dengan menggabungkan teknologi modern dan sistem pendukung keputusan yang cerdas, kami membantu pengguna membandingkan properti secara efisien dan percaya diri.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Baik Anda seorang pembeli pertama maupun investor berpengalaman, daftar pilihan kami yang dikurasi serta algoritma cerdas memastikan Anda menemukan rumah yang sangat cocok dengan gaya hidup dan anggaran Anda.
        </p>
      </div>
    </div>
  </section>
);

const MissionSection = () => {
  const missions = [
    { icon: <Target size={32} />, title: "Informasi Properti Terpercaya", desc: "Kami memastikan semua daftar properti telah diverifikasi, akurat, dan terbaru." },
    { icon: <Search size={32} />, title: "Menyederhanakan Pencarian", desc: "Antarmuka intuitif yang dirancang untuk menghemat waktu dan tenaga Anda." },
    { icon: <Award size={32} />, title: "Memberikan Rekomendasi Cerdas", desc: "Wawasan berbasis data untuk mencocokkan Anda dengan rumah idaman." }
  ];

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Misi Kami</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {missions.map((mission, idx) => (
          <Card key={idx} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 group">
            <CardBody className="p-8 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {mission.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{mission.title}</h3>
              <p className="text-slate-500">{mission.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {
  const features = [
    { icon: <CheckCircle size={24} />, title: "Listing Terverifikasi", desc: "Setiap properti diperiksa keasliannya secara menyeluruh." },
    { icon: <Zap size={24} />, title: "Rekomendasi Cerdas", desc: "Saran berbasis AI yang disesuaikan dengan preferensi unik Anda." },
    { icon: <Search size={24} />, title: "Pencarian Super Cepat", desc: "Kemampuan pencarian dan penyaringan properti secepat kilat." },
    { icon: <Heart size={24} />, title: "Properti Favorit", desc: "Simpan dan bandingkan pilihan teratas Anda dengan mudah." },
    { icon: <MessageSquare size={24} />, title: "Kontak Langsung", desc: "Berkomunikasi langsung dengan pemilik properti dan agen." },
    { icon: <MonitorSmartphone size={24} />, title: "Pengalaman Responsif", desc: "Penjelajahan tanpa hambatan di desktop, tablet, dan ponsel." }
  ];

  return (
    <section className="px-6 py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mengapa Memilih Kami</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Temukan berbagai keuntungan yang menjadikan platform kami pilihan utama bagi para pembeli rumah.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <Card key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardBody className="p-6 flex flex-row items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{feat.title}</h3>
                  <p className="text-sm text-slate-500">{feat.desc}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { title: "Jelajahi Properti", icon: <Search size={24} /> },
    { title: "Filter Lokasi", icon: <MapPin size={24} /> },
    { title: "Bandingkan Rumah", icon: <CheckCircle size={24} /> },
    { title: "Lihat Detail", icon: <Eye size={24} /> },
    { title: "Hubungi Pemilik", icon: <MessageSquare size={24} /> }
  ];

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto text-center bg-slate-50">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">Cara Kerjanya</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 bg-white border-2 border-slate-200 text-blue-600 rounded-2xl shadow-sm flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:-translate-y-1 transition-all duration-300">
                {step.icon}
              </div>
              <p className="font-semibold text-slate-800 max-w-[120px]">{step.title}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="text-slate-300 md:-mt-8 hidden md:block">
                 <svg width="40" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            )}
            {idx < steps.length - 1 && (
              <div className="text-slate-300 md:hidden my-2">
                 <ArrowDown size={24} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const DSSSection = () => {
  const criteria = [
    { icon: <Award size={24}/>, title: "Harga", desc: "Dievaluasi agar sesuai dengan anggaran Anda secara optimal." },
    { icon: <MapPin size={24}/>, title: "Jarak", desc: "Kedekatan dengan pusat kota dan fasilitas penting." },
    { icon: <Shield size={24}/>, title: "Keamanan", desc: "Peringkat keselamatan di lingkungan sekitar." },
    { icon: <Maximize size={24}/>, title: "Luas Tanah", desc: "Ruang luas yang disesuaikan dengan gaya hidup Anda." }
  ];

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <Card className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <CardBody className="p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Rekomendasi Cerdas dengan TOPSIS</h2>
            <p className="text-lg text-slate-600">
              Kami memanfaatkan metode sistem pendukung keputusan TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution). Model matematika ini membantu Anda membandingkan berbagai properti dengan menyeimbangkan berbagai kriteria secara mulus.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
            {criteria.map((crit, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <div className="text-blue-600 mb-3">{crit.icon}</div>
                <h4 className="font-bold text-slate-900 mb-1">{crit.title}</h4>
                <p className="text-sm text-slate-500">{crit.desc}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

const StatisticsSection = () => {
  const stats = [
    { val: "500+", label: "Properti Tersedia", icon: <Home size={32}/> },
    { val: "20+", label: "Kecamatan Terjangkau", icon: <Map size={32}/> },
    { val: "1000+", label: "Pengguna Puas", icon: <Users size={32}/> },
    { val: "24/7", label: "Dukungan Siap Sedia", icon: <Clock size={32}/> }
  ];

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-blue-200 mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-extrabold text-blue-600 mb-2">{stat.val}</h3>
            <p className="font-medium text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


const FAQSection = () => {
  const faqs = [
    { q: "Bagaimana cara mencari properti?", a: "Anda dapat menggunakan kolom pencarian intuitif kami di Halaman Utama, memfilter berdasarkan lokasi, harga, dan fasilitas, atau membiarkan mesin rekomendasi cerdas kami menyarankan properti untuk Anda." },
    { q: "Apakah platform ini gratis?", a: "Ya, menjelajahi properti dan menggunakan alat rekomendasi cerdas kami sepenuhnya gratis untuk semua pengguna." },
    { q: "Bagaimana rekomendasi dihitung?", a: "Kami menggunakan metode pendukung keputusan TOPSIS, yang secara matematis memberi peringkat properti berdasarkan seberapa dekat mereka dengan kriteria ideal Anda (harga, jarak, keamanan, dll)." },
    { q: "Bisakah saya menyimpan properti favorit?", a: "Tentu saja. Setelah Anda membuat akun gratis, Anda dapat mengklik ikon hati pada listing mana pun untuk menyimpannya ke dasbor pribadi Anda." },
    { q: "Bisakah saya menghubungi pemilik properti secara langsung?", a: "Ya! Setiap halaman detail properti menyertakan tombol kontak langsung yang menghubungkan Anda seketika dengan pemilik terverifikasi atau agen yang bertugas." }
  ];

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
        <p className="text-slate-500 text-lg">Punya pertanyaan? Kami punya jawabannya.</p>
      </div>
      <Accordion variant="splitted" className="gap-4">
        {faqs.map((faq, idx) => (
          <AccordionItem 
            key={idx} 
            aria-label={faq.q} 
            title={<span className="font-semibold text-slate-800">{faq.q}</span>}
            className="bg-white border border-slate-200 shadow-sm rounded-2xl px-2"
          >
            <p className="text-slate-600 pb-4">{faq.a}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

const CTASection = () => (
  <section className="px-6 py-12 max-w-6xl mx-auto mb-20">
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl shadow-xl overflow-hidden border-none">
      <CardBody className="py-20 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Menemukan Rumah Impian Anda?</h2>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-10">
          Mulai jelajahi ratusan properti yang tersedia hari ini. Babak baru kehidupan Anda dimulai di sini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 px-10 h-14">
            Jelajahi Properti
          </Button>
          <Button size="lg" variant="bordered" className="border-blue-300 text-white hover:bg-blue-700/50 rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-10 h-14">
            Hubungi Kami
          </Button>
        </div>
      </CardBody>
    </Card>
  </section>
);