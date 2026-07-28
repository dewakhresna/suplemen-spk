"use client";

import { Card, CardBody, Avatar, Button, Skeleton } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import Link from "next/link";

export default function ProfileInfo() {
  const { user, isLoading, isLoggedIn } = useAuth();
  const profileImageUrl = useProfilePicture(user?.profilePicture);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <Card className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10">
          <CardBody className="flex flex-col items-center text-center gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-3 flex flex-col items-center w-full mt-2">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="h-4 w-40 rounded-lg" />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="w-full bg-white rounded-3xl shadow-2xl shadow-red-900/5 border border-red-50 p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <CardBody className="flex flex-col items-center text-center gap-6 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-700 to-red-500 rounded-full blur-md opacity-20 scale-105"></div>

            <div className="p-1.5 bg-gradient-to-tr from-red-700 via-red-600 to-red-500 rounded-full shadow-xl shadow-red-700/20 relative z-10">
              <Avatar
                src={
                  profileImageUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                name={user.name || user.fullname || user.fullName || "User"}
                className="w-28 h-28 sm:w-32 sm:h-32 text-large border-4 border-white bg-white"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-1.5 mt-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {user.name || user.fullname || user.fullName}
            </h2>

            {(user.username || user.role) && (
              <p className="text-red-600 font-semibold capitalize text-sm tracking-wide">
                {user.username ? `@${user.username}` : user.role}
              </p>
            )}

            <p className="text-slate-500 font-medium">{user.email}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <Button
              as={Link}
              href="/profile/edit-profile"
              className="bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
            >
              Edit Data Diri
            </Button>
            <Button
              as={Link}
              href="/profile/edit-password"
              variant="bordered"
              className="bg-white border-2 border-slate-200 text-slate-700 font-semibold px-8 py-6 rounded-xl hover:bg-slate-50 hover:border-amber-400 hover:text-slate-900 transition-colors"
            >
              Ubah Kata Sandi
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}