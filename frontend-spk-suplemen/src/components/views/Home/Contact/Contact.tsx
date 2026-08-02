"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  HelpCircle,
  MessageSquare,
  Shield,
  Users,
  Send,
  RefreshCw,
  Activity,
  PhoneCall,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <HeroSection />
      <ContactInfoSection />
      <WhyContactUsSection />
      <CTASection />
    </main>
  );
}

const HeroSection = () => (
  <section className="relative px-6 py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-b from-red-50 to-slate-50 rounded-b-3xl">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold text-sm mb-6 shadow-sm">
      <PhoneCall size={16} /> Hubungi Kami
    </div>
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-tight">
      Kami Siap Membantu Anda Menemukan{" "}
      <span className="text-red-600">Suplemen Terbaik</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
      Ada pertanyaan tentang platform kami atau butuh bantuan untuk menemukan
      kebutuhan nutrisi yang tepat? Tim kami siap membantu Anda.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Button
        as={Link}
        href="/suplements"
        color="primary"
        size="lg"
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-medium shadow-md shadow-red-500/20 hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 h-14 text-white"
      >
        Jelajahi Suplemen
      </Button>
    </div>
  </section>
);

const ContactInfoSection = () => {
  const contactDetails = [
    {
      icon: <Phone size={24} />,
      title: "Telepon",
      value: "+62 812-3456-7890",
      desc: "Hubungi kami langsung untuk pertanyaan mendesak terkait layanan.",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "support@suplemenpilihan.com",
      desc: "Kirimkan email kepada kami kapan saja.",
    },
    {
      icon: <Clock size={24} />,
      title: "Jam Kerja",
      value: "Sen - Jum, 09.00 - 17.00 WIB",
      desc: "Jam operasional layanan dukungan ahli kami.",
    },
  ];

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto -mt-16 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
        Kontak Kami
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {contactDetails.map((detail, idx) => (
          <Card
            key={idx}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
          >
            <CardBody className="p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md shadow-red-500/20">
                {detail.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {detail.title}
                </p>
                <h3 className="text-lg font-bold text-slate-900">
                  {detail.value}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {detail.desc}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

const WhyContactUsSection = () => {
  const reasons = [
    {
      icon: <Clock size={32} />,
      title: "Respon Cepat",
      desc: "Kami menjamin balasan atas pertanyaan Anda dalam 24 jam agar pencarian suplemen Anda tetap lancar.",
    },
    {
      icon: <Users size={32} />,
      title: "Konsultasi Ahli",
      desc: "Berbicara langsung dengan konsultan kesehatan berpengalaman untuk memandu keputusan asupan nutrisi Anda.",
    },
    {
      icon: <Shield size={32} />,
      title: "Layanan Terpercaya",
      desc: "Data kesehatan dan pertanyaan Anda ditangani dengan tingkat keamanan dan kerahasiaan tertinggi.",
    },
  ];

  return (
    <section className="px-6 py-20 bg-slate-50 border-y border-slate-200">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
        Kenapa Harus Kontak Kami
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <Card
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-red-200 transition-all duration-300 group"
            >
              <CardBody className="p-8 flex flex-col items-start gap-4">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {reason.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{reason.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="px-6 py-12 max-w-6xl mx-auto mb-20 mt-8">
    <Card className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-xl overflow-hidden border-none">
      <CardBody className="py-20 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Mari Temukan Nutrisi Sempurna Anda Bersama-sama
        </h2>
        <p className="text-red-100 text-lg md:text-xl max-w-2xl mb-10">
          Tim kami selalu siap membantu Anda menemukan suplemen yang paling
          sesuai dengan tujuan kesehatan dan kebugaran Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            as={Link}
            href="/"
            size="lg"
            className="bg-white text-red-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 px-10 h-14"
          >
            Diskusikan Kebutuhan Suplemen
          </Button>
        </div>
      </CardBody>
    </Card>
  </section>
);
