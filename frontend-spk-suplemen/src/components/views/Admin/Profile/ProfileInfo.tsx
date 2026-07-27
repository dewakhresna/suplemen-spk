"use client";

import { Card, CardBody, Avatar, Button, Skeleton } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function ProfileInfo() {
  const { user, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
        <Card className="w-full bg-white rounded-2xl shadow-md border-none p-6 sm:p-10">
          <CardBody className="flex flex-col items-center text-center gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-3 flex flex-col items-center w-full mt-2">
              <Skeleton className="h-8 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-1/3 rounded-lg" />
              <Skeleton className="h-4 w-2/5 rounded-lg" />
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
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="w-full bg-white rounded-2xl shadow-md border-none p-6 sm:p-10">
        <CardBody className="flex flex-col items-center text-center gap-6">
          <Avatar
            src={
              user.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            name={user.name || "User"}
            className="w-32 h-32 text-large border-4 border-blue-50"
          />

          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900">
              {user.name || user.fullname}
            </h2>

            {(user.username || user.role) && (
              <p className="text-blue-600 font-medium capitalize">
                {user.username ? `@${user.username}` : user.role}
              </p>
            )}

            <p className="text-slate-500">{user.email}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Button
              as={Link}
              href="/admin/profile/edit-profile"
              color="primary"
              className="bg-blue-600 font-medium px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-transform"
            >
              Edit Data Diri
            </Button>
            <Button
              as={Link}
              href="/admin/profile/edit-password"
              variant="bordered"
              className="border-slate-200 text-slate-700 font-medium px-8 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-colors"
            >
              Edit Password
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
