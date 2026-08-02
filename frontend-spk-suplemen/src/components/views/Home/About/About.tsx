"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  Activity,
  Target,
  Search,
  Award,
  CheckCircle,
  Zap,
  Heart,
  MessageSquare,
  Smartphone,
  Shield,
  Star,
  Users,
  Layers,
  Clock,
  Eye,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";

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
  <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center bg-gradient-to-b from-red-50 to-slate-50 rounded-b-3xl">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold text-sm mb-6 shadow-sm">
      <Activity size={16} /> Tentang Platform Kami
    </div>
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-tight">
      Temukan Suplemen Terbaik Anda dengan{" "}
      <span className="text-red-600">Percaya Diri</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
      Platform kami membantu pengguna menemukan nutrisi terbaik melalui
      pengalaman pencarian yang intuitif dan sistem rekomendasi cerdas. Kami
      membuat pemilihan suplemen harian Anda menjadi lebih mudah, lebih cepat,
      dan lebih terpercaya.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Button
        as={Link}
        href="/suplements"
        color="primary"
        size="lg"
        className="bg-red-600 rounded-xl font-medium shadow-md shadow-red-500/20 hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 h-14 text-white"
      >
        Jelajahi Suplemen
      </Button>
      <Button
        as={Link}
        href="/contact"
        variant="bordered"
        size="lg"
        className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl font-medium hover:scale-105 transition-all duration-300 px-8 h-14"
      >
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
          src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=1200&q=80"
          alt="Suplemen dan Kesehatan"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-red-900/10"></div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Siapa Kami
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Kami adalah platform rekomendasi kesehatan cerdas yang dirancang untuk
          menyederhanakan perjalanan pemilihan nutrisi Anda. Dengan
          menggabungkan teknologi modern dan sistem pendukung keputusan yang
          presisi, kami membantu Anda membandingkan berbagai produk secara
          efisien.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Baik Anda seorang pemula dalam kebugaran maupun atlet berpengalaman,
          daftar pilihan kami yang dikurasi serta algoritma AI memastikan Anda
          menemukan suplemen yang sangat cocok dengan target kesehatan dan
          anggaran Anda.
        </p>
      </div>
    </div>
  </section>
);

const MissionSection = () => {
  const missions = [
    {
      icon: <Target size={32} />,
      title: "Informasi Terpercaya",
      desc: "Kami memastikan semua data produk telah diverifikasi, akurat, dan sesuai standar kesehatan.",
    },
    {
      icon: <Search size={32} />,
      title: "Menyederhanakan Pencarian",
      desc: "Antarmuka intuitif yang dirancang untuk menghemat waktu Anda dalam memilih nutrisi.",
    },
    {
      icon: <Award size={32} />,
      title: "Rekomendasi Cerdas",
      desc: "Wawasan berbasis data untuk mencocokkan Anda dengan suplemen yang paling ideal.",
    },
  ];

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
        Misi Kami
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {missions.map((mission, idx) => (
          <Card
            key={idx}
            className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-red-300 transition-all duration-300 group"
          >
            <CardBody className="p-8 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                {mission.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {mission.title}
              </h3>
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
    {
      icon: <CheckCircle size={24} />,
      title: "Produk Terverifikasi",
      desc: "Setiap suplemen diperiksa keaslian dan kandungan nutrisinya.",
    },
    {
      icon: <Zap size={24} />,
      title: "Rekomendasi AI",
      desc: "Saran berbasis algoritma yang disesuaikan dengan kondisi tubuh Anda.",
    },
    {
      icon: <Search size={24} />,
      title: "Pencarian Instan",
      desc: "Kemudahan mencari produk berdasarkan kategori atau tujuan kebugaran.",
    },
    {
      icon: <Heart size={24} />,
      title: "Simpan Favorit",
      desc: "Tandai dan bandingkan produk pilihan teratas Anda dengan mudah.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Konsultasi Ahli",
      desc: "Tersedia asisten AI dan akses untuk berdiskusi terkait nutrisi.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Akses Kapan Saja",
      desc: "Penjelajahan tanpa hambatan di desktop, tablet, dan ponsel pintar.",
    },
  ];

  return (
    <section className="px-6 py-24 bg-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mengapa Memilih Kami
          </h2>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Temukan berbagai keuntungan yang menjadikan platform kami panduan
            utama bagi pencinta kesehatan.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <Card
              key={idx}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <CardBody className="p-6 flex flex-row items-start gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>
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
    { title: "Jelajahi Produk", icon: <Search size={24} /> },
    { title: "Pilih Kategori", icon: <Layers size={24} /> },
    { title: "Bandingkan Nutrisi", icon: <CheckCircle size={24} /> },
    { title: "Lihat Kandungan", icon: <Eye size={24} /> },
    { title: "Dapatkan Solusi", icon: <MessageSquare size={24} /> },
  ];

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto text-center bg-slate-50">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">
        Cara Kerjanya
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 bg-white border-2 border-slate-200 text-red-600 rounded-2xl shadow-sm flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-50 group-hover:-translate-y-1 transition-all duration-300">
                {step.icon}
              </div>
              <p className="font-semibold text-slate-800 max-w-[120px]">
                {step.title}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div className="text-slate-300 md:-mt-8 hidden md:block">
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
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
    {
      icon: <Award size={24} />,
      title: "Harga",
      desc: "Dievaluasi agar sesuai dengan efisiensi anggaran bulanan Anda.",
    },
    {
      icon: <Star size={24} />,
      title: "Rating",
      desc: "Kualitas produk berdasarkan ulasan dan uji klinis.",
    },
    {
      icon: <Activity size={24} />,
      title: "Dosis",
      desc: "Kesesuaian takaran dengan kebutuhan spesifik tubuh.",
    },
    {
      icon: <Zap size={24} />,
      title: "Efektivitas",
      desc: "Kecepatan dan persentase penyerapan nutrisi oleh tubuh.",
    },
  ];

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <Card className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <CardBody className="p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              Rekomendasi Cerdas dengan TOPSIS
            </h2>
            <p className="text-lg text-slate-600">
              Kami memanfaatkan metode sistem pendukung keputusan TOPSIS
              (Technique for Order of Preference by Similarity to Ideal
              Solution). Model matematika ini membantu Anda membandingkan
              berbagai suplemen dengan menyeimbangkan kebutuhan nutrisi secara
              presisi.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
            {criteria.map((crit, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-red-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-red-600 mb-3">{crit.icon}</div>
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
    { val: "500+", label: "Suplemen Tersedia", icon: <Activity size={32} /> },
    { val: "20+", label: "Kategori Kesehatan", icon: <Layers size={32} /> },
    { val: "1000+", label: "Pengguna Bugar", icon: <Users size={32} /> },
    { val: "24/7", label: "Asisten AI Aktif", icon: <Clock size={32} /> },
  ];

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-red-200 mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-extrabold text-red-600 mb-2">
              {stat.val}
            </h3>
            <p className="font-medium text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      q: "Bagaimana cara mencari suplemen yang tepat?",
      a: "Anda dapat menggunakan kolom pencarian intuitif kami, memfilter berdasarkan kategori dan harga, atau membiarkan asisten AI kami menyarankan produk terbaik untuk tujuan Anda.",
    },
    {
      q: "Apakah platform ini gratis?",
      a: "Ya, menjelajahi produk dan menggunakan alat rekomendasi cerdas kami sepenuhnya gratis untuk semua pengguna.",
    },
    {
      q: "Bagaimana rekomendasi dihitung?",
      a: "Kami menggunakan algoritma TOPSIS yang secara sistematis memberi peringkat produk berdasarkan seberapa dekat mereka dengan kriteria ideal Anda (harga, rating, dosis, dan efektivitas).",
    },
    {
      q: "Bisakah saya menyimpan produk favorit?",
      a: "Tentu saja. Setelah Anda membuat akun, Anda dapat mengklik ikon hati pada produk mana pun untuk menyimpannya ke dasbor pribadi Anda.",
    },
    {
      q: "Apakah saya bisa berkonsultasi tentang suplemen?",
      a: "Ya! Fitur Live Chat AI kami siap memberikan saran dan panduan terkait kebutuhan nutrisi Anda secara langsung.",
    },
  ];

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-slate-500 text-lg">
          Punya pertanyaan? Kami punya jawabannya.
        </p>
      </div>
      <Accordion variant="splitted" className="gap-4">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            aria-label={faq.q}
            title={
              <span className="font-semibold text-slate-800">{faq.q}</span>
            }
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
    <Card className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-xl overflow-hidden border-none">
      <CardBody className="py-20 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Siap Mencapai Target Kebugaran Anda?
        </h2>
        <p className="text-red-100 text-lg md:text-xl max-w-2xl mb-10">
          Mulai jelajahi ratusan suplemen yang tersedia hari ini. Babak baru
          kesehatan Anda dimulai di sini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            as={Link}
            href="/suplements"
            size="lg"
            className="bg-white text-red-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 px-10 h-14"
          >
            Jelajahi Suplemen
          </Button>
          <Button
            as={Link}
            href="/"
            size="lg"
            variant="bordered"
            className="border-red-300 text-white hover:bg-red-700/50 rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-10 h-14"
          >
            Mulai Chat AI
          </Button>
        </div>
      </CardBody>
    </Card>
  </section>
);
