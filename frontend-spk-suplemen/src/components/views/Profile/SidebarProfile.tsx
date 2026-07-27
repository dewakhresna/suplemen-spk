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
    { id: "favorit", label: "Rumah Favorit", icon: Heart },
    { id: "logout", label: "Logout", icon: LogOut, isDanger: true },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-4 mb-8">
          {isLoading ? (
            // Tampilan Skeleton saat data loading
            <>
              <Skeleton className="w-14 h-14 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-lg" />
              </div>
            </>
          ) : (
            <>
              <Avatar 
                src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                name={user?.username || "User"}
                size="lg" 
                className="border-2 border-blue-100" 
              />
              <div>
                <h3 className="font-bold text-slate-900 line-clamp-1">
                  {user?.username || user?.fullname || "Pengguna"}
                </h3>
              </div>
            </>
          )}
        </div>

        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? item.isDanger
                      ? "bg-red-50 text-red-600"
                      : "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : item.isDanger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}