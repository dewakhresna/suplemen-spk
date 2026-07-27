import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col gap-4 text-slate-600">
            <Link href="/" className="flex items-center gap-2 text-blue-600">
              <Building2 size={32} strokeWidth={1.5} />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Estate<span className="text-blue-600">Prime</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mt-2">
              Platform properti terpercaya untuk menemukan rumah impian Anda. Kami menggabungkan teknologi modern dengan pelayanan sepenuh hati.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Perusahaan</h4>
            <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Tentang Kami</Link>
            <Link href="/careers" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Karir</Link>
            <Link href="/blog" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Blog Properti</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Hubungi Kami</Link>
          </div>

          {/* Kolom 3: Layanan */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Layanan</h4>
            <Link href="/buy" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Beli Rumah</Link>
            <Link href="/rent" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Sewa Apartemen</Link>
            <Link href="/sell" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Jual Properti</Link>
            <Link href="/calculator" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Kalkulator KPR</Link>
          </div>

          {/* Kolom 4: Newsletter (CRO Strategy) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Dapatkan Info Terbaru</h4>
            <p className="text-sm text-slate-600 mb-2">
              Berlangganan newsletter kami untuk mendapatkan penawaran eksklusif.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Email Anda" 
                variant="bordered"
                radius="lg"
                classNames={{
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600",
                }}
              />
              <Button isIconOnly color="primary" className="bg-blue-600 rounded-lg shrink-0">
                <Mail size={18} />
              </Button>
            </form>
          </div>

        </div>

        {/* Bagian Bawah: Copyright & Social Media */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EstatePrime. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-pink-600 transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}