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

export default function AuthMenu() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const logout = useLogout();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-16 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={user?.username || "User"}
            size="sm"
            src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2 text-slate-700">
            <p className="font-semibold text-xs">Signed in as</p>
            <p className="font-semibold">{user?.username || user?.username || "User"}</p>
          </DropdownItem>
          
          <DropdownItem key="settings" href="/profile" as={Link}>
            Menu Profile
          </DropdownItem>
          
          <DropdownItem key="logout" color="danger" onPress={logout}>
            Keluar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        as={Link} 
        href="/auth/login" 
        variant="light" 
        className="hidden sm:flex font-medium text-slate-600"
      >
        Log In
      </Button>
      <Button 
        as={Link} 
        href="/auth/register" 
        color="primary" 
        className="bg-blue-600 font-medium rounded-xl shadow-blue-500/30 shadow-lg hover:-translate-y-0.5 transition-transform"
      >
        Register
      </Button>
    </div>
  );
}