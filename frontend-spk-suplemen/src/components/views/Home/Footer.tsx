import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="flex flex-col gap-4 text-slate-600">
            <Link href="/" className="flex items-center gap-2 text-red-600">
              <HeartPulse size={32} strokeWidth={2} />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Vital<span className="text-red-600">Prime</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mt-2">
              Your trusted partner in health and wellness. We provide scientifically-backed, premium supplements to help you reach your peak performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Company</h4>
            <Link href="/about" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Our Story</Link>
            <Link href="/quality" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Quality Standards</Link>
            <Link href="/blog" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Health Blog</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Contact Us</Link>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Customer Service</h4>
            <Link href="/shop" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Shop All</Link>
            <Link href="/shipping" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Shipping & Returns</Link>
            <Link href="/track-order" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Track Order</Link>
            <Link href="/faq" className="text-sm text-slate-600 hover:text-red-600 transition-colors">FAQs</Link>
          </div>

          {/* Newsletter (CRO Strategy) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Join the Vital Club</h4>
            <p className="text-sm text-slate-600 mb-2">
              Subscribe to our newsletter for exclusive offers, workout tips, and 10% off your first order.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                variant="bordered"
                radius="lg"
                classNames={{
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-300 focus-within:!border-red-600",
                }}
              />
              <Button isIconOnly color="primary" className="bg-red-600 hover:bg-red-700 rounded-lg shrink-0">
                <Mail size={18} />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Copyright & Social Media */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vital Prime Supplements. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="#" className="hover:text-red-600 transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-red-400 transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-pink-600 transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}