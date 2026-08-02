"use client";

import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SidebarProfile from "@/components/views/Profile/SidebarProfile";
import ProfileInfo from "@/components/views/Profile/ProfileInfo";
import FavoriteList from "@/components/views/Profile/Favorite/FavoriteList";
import LogoutSection from "@/components/views/Profile/LogoutSection";
import environment from "@/config/environment";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("data-diri");

  const renderContent = () => {
    switch (activeTab) {
      case "data-diri":
        return <ProfileInfo />;
      case "favorit":
        return <FavoriteList />;
      case "logout":
        return <LogoutSection />;
      default:
        return <ProfileInfo />;
    }
  };

  const baseUrl =
    environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>Profil | Vital Prime</title>
        <link
          rel="icon"
          href={`${baseUrl}/uploads/logo-vitalprime.png`}
          type="image/png"
        ></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-slate-50 text-slate-900 font-sans py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 lg:mb-12 flex flex-col items-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:bg-white hover:text-red-600 hover:shadow-md hover:shadow-red-900/5 group"
            >
              <ArrowLeft
                size={16}
                strokeWidth={2.2}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Fixed Width Sidebar */}
            <SidebarProfile activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 w-full min-h-[500px]">{renderContent()}</div>
          </div>
        </div>
      </main>
    </>
  );
}
