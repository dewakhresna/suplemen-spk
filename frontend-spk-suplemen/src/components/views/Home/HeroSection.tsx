import { Button } from "@heroui/react";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
          Find Your Dream Home <span className="text-blue-600">Today</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Browse thousands of premium real estate listings. Whether you are looking for a modern city penthouse or a quiet suburban retreat, we have the perfect home for you.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            size="lg" 
            color="primary" 
            endContent={<Search size={18} />}
            className="bg-blue-600 px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
          >
            Browse Houses
          </Button>
        </div>
      </div>
    </section>
  );
}