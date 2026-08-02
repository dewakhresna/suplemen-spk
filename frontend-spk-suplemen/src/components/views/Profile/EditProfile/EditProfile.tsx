"use client";

import Head from "next/head";
import React, { useRef } from "react";
import Link from "next/link";
import { Card, Input, Button, Avatar, Divider, Spinner } from "@heroui/react";
import {
  User,
  Mail,
  Camera,
  AtSign,
  ArrowLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { useEditProfile } from "./useEditProfile";
import environment from "@/config/environment";

export default function EditProfilePage() {
  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>Edit Profile | Vital Prime</title>
        <link
          rel="icon"
          href={`${environment.Domain}/uploads/logo-vitalprime.png`}
          type="image/png"
        ></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex justify-center items-start font-sans">
        <div className="w-full max-w-[900px]">
          <PageNavigation />
          <EditProfileCard />
        </div>
      </main>
    </>
  );
}

const PageNavigation = () => {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:bg-white hover:text-red-600 hover:shadow-md hover:shadow-red-900/5 group"
      >
        <ArrowLeft
          size={18}
          strokeWidth={2.2}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Kembali ke Profil
      </Link>

      {/* Breadcrumb */}
      <div className="mt-5 flex items-center gap-2.5 text-sm font-medium ml-1">
        <Link
          href="/"
          className="text-slate-400 transition-colors hover:text-red-600"
        >
          Beranda
        </Link>
        <ChevronRight size={16} className="text-slate-300" />
        <Link
          href="/profile"
          className="text-slate-400 transition-colors hover:text-red-600"
        >
          Profil
        </Link>
        <ChevronRight size={16} className="text-slate-300" />
        <span className="font-bold text-red-700">Edit Profil</span>
      </div>
    </div>
  );
};

const EditProfileCard = () => {
  const {
    formData,
    isLoading,
    isSaving,
    isUploadingPhoto,
    handleInputChange,
    handleSaveChanges,
    handleUploadPhoto,
    handleCancel,
  } = useEditProfile();

  if (isLoading) {
    return (
      <Card className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 flex justify-center items-center h-64">
        <Spinner size="lg" color="danger" />
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 lg:p-12 transition-all duration-300 relative overflow-hidden">
      {/* Subtle Premium Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full opacity-60 z-0"></div>

      <div className="relative z-10">
        <PageHeader />

        <div className="flex flex-col gap-12 mt-10">
          <ProfileAvatarUploader
            profilePicture={formData.profilePicture}
            onUpload={handleUploadPhoto}
            isUploading={isUploadingPhoto}
          />
          <ProfileForm formData={formData} onChange={handleInputChange} />
          <ActionButtons
            onSave={handleSaveChanges}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </div>
      </div>
    </Card>
  );
};

const PageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 text-red-600 rounded-xl">
          <UserCircle size={28} strokeWidth={2} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Edit Profil
        </h1>
      </div>
      <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
        Kelola informasi pribadi agar akun Anda tetap terbaru.
      </p>
      <Divider className="my-6 bg-slate-100/60" />
    </div>
  );
};

const ProfileAvatarUploader = ({
  profilePicture,
  onUpload,
  isUploading,
}: {
  profilePicture: string;
  onUpload: (files: FileList | null) => void;
  isUploading: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath || imagePath === "user.jpg" || imagePath === "") {
      return "https://i.pravatar.cc/150?u=a042581f4e29026704d";
    }
    if (imagePath.startsWith("http")) return imagePath;

    return `${environment.Domain}${imagePath}`;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Input File Tersembunyi */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      <div
        className="relative group cursor-pointer"
        onClick={handleButtonClick}
      >
        {/* Premium Red-Gold Ring Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-red-500 to-amber-400 rounded-full blur-md opacity-40 scale-105 group-hover:scale-110 transition-transform duration-500"></div>

        <div className="relative p-1.5 bg-gradient-to-tr from-red-700 via-red-600 to-amber-500 rounded-full shadow-xl shadow-red-700/20 group-hover:shadow-2xl group-hover:shadow-red-700/30 transition-shadow duration-300">
          <Avatar
            src={getImageUrl(profilePicture)}
            className={`w-32 h-32 text-large border-4 border-white bg-white transition-transform duration-500 group-hover:scale-[1.02] ${isUploading ? "opacity-50" : ""}`}
          />

          {/* Loading Spinner Overlap saat mengunggah */}
          {isUploading ? (
            <div className="absolute inset-1.5 bg-slate-900/30 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
              <Spinner size="md" color="white" />
            </div>
          ) : (
            /* Dark Camera Overlay */
            <div className="absolute inset-1.5 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10">
              <Camera className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 delay-75" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <Button
          variant="bordered"
          size="sm"
          isLoading={isUploading}
          onPress={handleButtonClick}
          className="border-2 border-red-100 text-slate-700 font-bold hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 rounded-xl px-6 h-10 shadow-sm"
        >
          {isUploading ? "Mengunggah..." : "Ganti Foto"}
        </Button>
        <p className="text-xs text-slate-400 font-medium">
          Format PNG atau JPG, maksimal 5 MB.
        </p>
      </div>
    </div>
  );
};

const ProfileForm = ({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputClassNames = {
    inputWrapper:
      "bg-slate-50 border-slate-200 shadow-sm hover:border-red-300 focus-within:!border-red-600 focus-within:!ring-4 focus-within:!ring-red-100 focus-within:!bg-white transition-all duration-300 rounded-2xl h-14 px-4",
    label: "text-slate-800 font-bold pb-1.5 text-sm",
    input: "text-slate-900 placeholder:text-slate-400 text-base font-medium",
  };

  return (
    <div className="flex flex-col gap-7 w-full max-w-2xl mx-auto">
      <Input
        label="Nama Lengkap"
        name="fullName"
        labelPlacement="outside"
        placeholder="Masukkan nama lengkap"
        variant="bordered"
        startContent={<User className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        classNames={inputClassNames}
        value={formData.fullName}
        onChange={onChange}
      />

      <Input
        label="Username"
        name="username"
        labelPlacement="outside"
        placeholder="Masukkan username"
        variant="bordered"
        startContent={
          <AtSign className="text-slate-400 w-5 h-5 mr-2 shrink-0" />
        }
        classNames={inputClassNames}
        value={formData.username}
        onChange={onChange}
      />

      <Input
        label="Alamat Email"
        name="email"
        labelPlacement="outside"
        placeholder="Masukkan alamat email"
        type="email"
        variant="bordered"
        startContent={<Mail className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        classNames={inputClassNames}
        value={formData.email}
        onChange={onChange}
      />
    </div>
  );
};

const ActionButtons = ({
  onSave,
  onCancel,
  isSaving,
}: {
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}) => {
  return (
    <>
      <Divider className="bg-slate-100/80 mt-2" />
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-2 max-w-2xl mx-auto w-full">
        <Button
          variant="bordered"
          onPress={onCancel}
          className="w-full sm:w-auto border-2 border-red-100 text-slate-700 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700 font-bold rounded-2xl px-8 h-12 transition-all duration-300"
        >
          Batal
        </Button>
        <Button
          color="danger"
          isLoading={isSaving}
          onPress={onSave}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 rounded-2xl px-10 h-12"
        >
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </>
  );
};
