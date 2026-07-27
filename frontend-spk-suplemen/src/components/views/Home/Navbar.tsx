import { Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthMenu from "../Auth/AuthMenu/AuthMenu";

export default function Navbar() {
  const router = useRouter();
  const getLinkClass = (path: string) => {
    const isActive = router.pathname === path || (path !== "/" && router.pathname.startsWith(path));
    
    return isActive
      ? "text-blue-600 font-semibold transition-colors" 
      : "hover:text-blue-600 transition-colors";     
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <Building2 size={32} strokeWidth={1.5} />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Estate<span className="text-blue-600">Prime</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-500">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/listings" className={getLinkClass("/listings")}>
            Listings
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
        </nav>
        <AuthMenu />
      </div>
    </header>
  );
}