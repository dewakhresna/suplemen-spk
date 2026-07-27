"use client";

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
} from "lucide-react";
import { useEditProfile } from "./useEditProfile";
import environment from "@/config/environment";

export default function EditProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex justify-center items-start font-sans">
      <div className="w-full max-w-[900px]">
        <PageNavigation />
        <EditProfileCard />
      </div>
    </main>
  );
}

const PageNavigation = () => {
  return (
    <div className="mb-8">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-all duration-300 hover:bg-white hover:text-blue-600 hover:shadow-sm"
      >
        <ArrowLeft size={18} strokeWidth={2.2} />
        Back to Profile
      </Link>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-400 transition-colors hover:text-blue-600"
        >
          Home
        </Link>
        <ChevronRight size={16} className="text-slate-300" />
        <Link
          href="/profile"
          className="text-slate-400 transition-colors hover:text-blue-600"
        >
          Profile
        </Link>
        <ChevronRight size={16} className="text-slate-300" />
        <span className="font-semibold text-blue-600">Edit Profile</span>
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
      <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-12 flex justify-center items-center h-64">
        <Spinner size="lg" color="primary" />
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 lg:p-12 transition-all duration-300">
      <PageHeader />

      <div className="flex flex-col gap-10 mt-8">
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
    </Card>
  );
};

const PageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl">👤</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 tracking-tight">
          Edit Profile
        </h1>
      </div>
      <p className="text-sm sm:text-base font-medium text-slate-500">
        Update your personal information and profile picture.
      </p>
      <Divider className="my-4 bg-slate-100" />
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
      "bg-white border-slate-200 shadow-sm hover:border-blue-300 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl h-14 px-4",
    label: "text-slate-700 font-medium pb-1",
    input: "text-slate-900 placeholder:text-slate-400 text-base",
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <Input
        label="Full Name"
        name="fullName"
        labelPlacement="outside"
        placeholder="Enter your full name"
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
        placeholder="Choose a username"
        variant="bordered"
        startContent={
          <AtSign className="text-slate-400 w-5 h-5 mr-2 shrink-0" />
        }
        classNames={inputClassNames}
        value={formData.username}
        onChange={onChange}
      />
      <Input
        label="Email Address"
        name="email"
        labelPlacement="outside"
        placeholder="Enter your email address"
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
  onCancel, // Tangkap properti onCancel
  isSaving,
}: {
  onSave: () => void;
  onCancel: () => void; // Definisikan tipe datanya
  isSaving: boolean;
}) => {
  return (
    <>
      <Divider className="bg-slate-100" />
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-2">
        {/* Hapus bungkus <Link>, gunakan onPress untuk memicu fungsi pembatalan */}
        <Button
          variant="bordered"
          onPress={onCancel}
          className="w-full sm:w-auto border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 font-medium rounded-xl px-8 h-12 transition-colors duration-300"
        >
          Cancel
        </Button>

        <Button
          color="primary"
          isLoading={isSaving}
          onPress={onSave}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl px-10 h-12"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </>
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
    <div className="flex flex-col items-center justify-center gap-4">
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
        <Avatar
          src={getImageUrl(profilePicture)}
          className={`w-32 h-32 text-large border-4 border-blue-50 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-blue-100 ${isUploading ? "opacity-50" : ""}`}
        />

        {/* Loading Spinner Overlap saat mengunggah */}
        {isUploading ? (
          <div className="absolute inset-0 bg-slate-900/20 rounded-full flex items-center justify-center">
            <Spinner size="md" color="white" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <Camera className="text-white w-8 h-8" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant="bordered"
          size="sm"
          isLoading={isUploading}
          onPress={handleButtonClick}
          className="border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-300 rounded-xl px-6 h-10"
        >
          {isUploading ? "Mengunggah..." : "Change Photo"}
        </Button>
        <p className="text-xs text-slate-400 font-medium">
          PNG, JPG, Maximum 5MB
        </p>
      </div>
    </div>
  );
};
