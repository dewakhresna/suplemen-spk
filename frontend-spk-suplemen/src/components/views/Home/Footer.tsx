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
            <Link href="/suplements" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Product</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Contact Us</Link>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Customer Service</h4>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-red-600 transition-colors">Discussion</Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-red-600 transition-colors">FAQs</Link>
          </div>

          {/* Newsletter (CRO Strategy) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 font-semibold mb-2">Join the Vital Prime</h4>
            <p className="text-sm text-slate-600 mb-2">
              Join us to get the best supplement recommendations for you.
            </p>
          </div>

        </div>

        {/* Bottom Section: Copyright & Social Media */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vital Prime Supplements. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}