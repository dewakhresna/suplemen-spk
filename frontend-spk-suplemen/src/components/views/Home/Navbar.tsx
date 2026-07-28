import { Button } from "@heroui/react";
import { HeartPulse, ShoppingCart } from "lucide-react";
import Link from "next/link";
import AuthMenu from "../Auth/AuthMenu/AuthMenu";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  
  const getLinkClass = (path: string) => {
    const isActive = router.pathname === path || (path !== "/" && router.pathname.startsWith(path));
    
    return `transition-colors ${
      isActive 
        ? "text-red-600 font-semibold" 
        : "text-slate-600 hover:text-red-600"
    }`; 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-red-600 group">
          <HeartPulse
            size={32}
            strokeWidth={2}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Vital<span className="text-red-600">Prime</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className={getLinkClass('/')}>
            Home
          </Link>
          <Link href="/suplements" className={getLinkClass('/suplements')}>
            Suplements
          </Link>
          <Link href="/benefits" className={getLinkClass('/benefits')}>
            About
          </Link>
          <Link href="/contact" className={getLinkClass('/contact')}>
            Contact
          </Link>
        </nav>

        <AuthMenu />
      </div>
    </header>
  );
}