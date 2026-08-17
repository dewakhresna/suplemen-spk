"use client";
import { 
  Button, 
  Avatar, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Skeleton 
} from "@heroui/react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { User, Heart, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AuthMenu() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const logout = useLogout();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-20 rounded-xl bg-slate-100" />
        <Skeleton className="h-10 w-28 rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Dropdown 
        placement="bottom-end" 
        classNames={{
          content: "rounded-2xl shadow-xl shadow-red-900/5 border border-slate-100 min-w-[240px] bg-white",
        }}
      >
        <DropdownTrigger>
          <div className="relative p-0.5 bg-gradient-to-tr from-red-600 via-red-500 to-amber-400 rounded-full shadow-md shadow-red-600/20 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300">
            <Avatar
              as="button"
              className="border-2 border-white bg-white transition-transform"
              name={user?.username || "User"}
              size="sm"
              src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
            />
          </div>
        </DropdownTrigger>
        
        <DropdownMenu 
          aria-label="Profile Actions" 
          variant="flat"
          itemClasses={{
            base: "rounded-xl data-[hover=true]:bg-red-50 data-[hover=true]:text-red-700 transition-colors gap-3 py-2.5",
            title: "font-semibold text-sm",
          }}
        >
          <DropdownItem 
            key="profile" 
            className="h-16 gap-2 text-slate-700 opacity-100 cursor-default data-[hover=true]:bg-transparent border-b border-slate-50 mb-2 rounded-none" 
            isReadOnly
          >
            <p className="font-medium text-xs text-slate-500">Masuk sebagai</p>
            <p className="font-bold text-slate-900 text-sm truncate">
              {user?.username || user?.fullname || "Pelanggan Premium"}
            </p>
          </DropdownItem>
          
          <DropdownItem key="settings" href="/profile" as={Link} startContent={<User size={18} />}>
            Menu Profil
          </DropdownItem>
          
          <DropdownItem 
            key="logout" 
            onPress={logout}
            className="text-red-600 bg-red-50/50 mt-2 data-[hover=true]:bg-red-600 data-[hover=true]:text-white font-bold transition-all duration-300"
            startContent={<LogOut size={18} />}
          >
            Keluar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Secondary Button */}
      <Button 
        as={Link} 
        href="/auth/login" 
        variant="light" 
        className="hidden sm:flex font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
      >
        Masuk
      </Button>
      
      {/* Primary Button */}
      <Button 
        as={Link} 
        href="/auth/register" 
        className="bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300"
      >
        Daftar
      </Button>
    </div>
  );
}