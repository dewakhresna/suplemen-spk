"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SidebarProfile from "@/components/views/Profile/SidebarProfile";
import ProfileInfo from "@/components/views/Profile/ProfileInfo";
import FavoriteList from "@/components/views/Profile/Favorite/FavoriteList";
import LogoutSection from "@/components/views/Profile/LogoutSection";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("data-diri");

  // Dynamic content renderer based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "data-diri":
        return <ProfileInfo />;
      case "favorit":
        return <FavoriteList/>;
      case "logout":
        return <LogoutSection />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Page Header dengan Tombol Kembali */}
        <div className="mb-8 lg:mb-12 flex flex-col items-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium mb-4"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Left: Fixed Width Sidebar */}
          <SidebarProfile  
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />

          {/* Right: Flexible Dynamic Content Area */}
          <div className="flex-1 w-full min-h-[500px]">
            {renderContent()}
          </div>

        </div>
      </div>
    </main>
  );
}