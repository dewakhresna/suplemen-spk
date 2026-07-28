"use client";

import { Avatar, Skeleton } from "@heroui/react";
import { User, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; 
import { useLogout } from "@/hooks/useLogout"; 

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SidebarProfile({ activeTab, setActiveTab }: SidebarProps) {
  const { user, isLoading } = useAuth();
  const logout = useLogout();

  const menuItems = [
    { id: "data-diri", label: "Data Diri", icon: User },
    { id: "favorit", label: "Produk Favorit", icon: Heart },
    { id: "logout", label: "Keluar Akun", icon: LogOut, isDanger: true },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-xl shadow-red-900/5 border border-red-50 p-6 lg:sticky lg:top-24 relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>

        <div className="flex flex-col items-center text-center gap-4 mb-8 relative z-10">
          {isLoading ? (
            <>
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="flex flex-col items-center gap-2 w-full mt-2">
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-3 w-1/2 rounded-lg" />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-700 to-red-500 rounded-full blur-md opacity-20 scale-105"></div>
                <div className="p-1.5 bg-gradient-to-tr from-red-700 via-red-600 to-red-500 rounded-full shadow-lg shadow-red-700/20 relative z-10">
                  <Avatar 
                    src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                    name={user?.username || "User"}
                    className="w-20 h-20 text-large border-2 border-white bg-white" 
                  />
                </div>
              </div>
              <div className="w-full mt-1">
                <h3 className="text-xl font-extrabold text-slate-900 line-clamp-1 tracking-tight">
                  {user?.name || user?.fullname || user?.username || "Pengguna"}
                </h3>
                <p className="text-red-600 font-semibold capitalize text-xs tracking-wide mt-1">
                  {user?.role || "Member"}
                </p>
              </div>
            </>
          )}
        </div>

        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar relative z-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout") {
                    logout();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap group ${
                  isActive
                    ? item.isDanger
                      ? "bg-red-50 text-red-600"
                      : "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20"
                    : item.isDanger
                    ? "text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100"
                    : "text-slate-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100"
                }`}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`${!isActive && !item.isDanger ? "group-hover:scale-110 transition-transform" : ""}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}