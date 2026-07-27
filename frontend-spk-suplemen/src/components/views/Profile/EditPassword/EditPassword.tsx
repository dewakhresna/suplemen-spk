"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Input, Button, Divider } from "@heroui/react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

// Import hook yang baru dibuat
import { useEditPassword } from "./useEditPassword";

export default function ChangePasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center py-12 px-4 sm:px-6 overflow-hidden">
      <div className="w-full max-w-[700px] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div>
          <Link 
            href="/profile" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
        </div>

        <Card className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 lg:p-12 transition-all duration-300">
          <PageHeader />
          <EditPasswordContent /> {/* Dipisah agar bisa memakai hook dengan rapi */}
        </Card>

      </div>
    </main>
  );
}

// ==========================================
// KONTEN UTAMA (Tempat Hook Diinjeksi)
// ==========================================
const EditPasswordContent = () => {
  const { formData, isSaving, handleInputChange, handleSaveChanges, handleCancel } = useEditPassword();

  return (
    <div className="flex flex-col gap-8 mt-8">
      <PasswordForm formData={formData} onChange={handleInputChange} />
      <ActionButtons onSave={handleSaveChanges} onCancel={handleCancel} isSaving={isSaving} />
    </div>
  );
};

// ==========================================
// HEADER SECTION
// ==========================================
const PageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔒</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 tracking-tight">
          Change Password
        </h1>
      </div>
      <p className="text-sm sm:text-base font-medium text-slate-500">
        Update your account password to keep your account secure.
      </p>
      <Divider className="mt-4 bg-slate-100" />
    </div>
  );
};

// ==========================================
// PASSWORD FORM INPUTS
// ==========================================
const PasswordForm = ({ formData, onChange }: { formData: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const inputClassNames = {
    inputWrapper: "bg-white border-slate-200 shadow-sm hover:border-blue-400 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl h-14 px-4",
    label: "text-slate-700 font-medium pb-1",
    input: "text-slate-900 placeholder:text-slate-400 text-base tracking-wide",
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
      
      <Input
        label="Current Password"
        name="oldPassword" // Sesuaikan dengan payload backend
        value={formData.oldPassword}
        onChange={onChange}
        labelPlacement="outside"
        placeholder="Enter current password"
        variant="bordered"
        type={isVisibleCurrent ? "text" : "password"}
        startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibilityCurrent}>
            {isVisibleCurrent ? (
              <EyeOff className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            ) : (
              <Eye className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            )}
          </button>
        }
        classNames={inputClassNames}
      />

      <Input
        label="New Password"
        name="password" // Sesuaikan dengan payload backend
        value={formData.password}
        onChange={onChange}
        labelPlacement="outside"
        placeholder="Enter new password"
        variant="bordered"
        type={isVisibleNew ? "text" : "password"}
        startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibilityNew}>
            {isVisibleNew ? (
              <EyeOff className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            ) : (
              <Eye className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            )}
          </button>
        }
        classNames={inputClassNames}
      />

      <Input
        label="Confirm New Password"
        name="confirmPassword" // Sesuaikan dengan payload backend
        value={formData.confirmPassword}
        onChange={onChange}
        labelPlacement="outside"
        placeholder="Re-enter new password"
        variant="bordered"
        type={isVisibleConfirm ? "text" : "password"}
        startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
            {isVisibleConfirm ? (
              <EyeOff className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            ) : (
              <Eye className="text-slate-400 hover:text-blue-600 transition-colors w-5 h-5" />
            )}
          </button>
        }
        classNames={inputClassNames}
      />
    </form>
  );
};

// ==========================================
// ACTION BUTTONS
// ==========================================
const ActionButtons = ({ onSave, onCancel, isSaving }: { onSave: () => void, onCancel: () => void, isSaving: boolean }) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      <Divider className="bg-slate-100" />
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
        <Button
          onPress={onCancel}
          variant="bordered"
          className="w-full sm:w-auto border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-xl px-8 h-12 transition-colors duration-300"
        >
          Cancel
        </Button>
        <Button
          onPress={onSave}
          isLoading={isSaving}
          color="primary"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl px-10 h-12"
        >
          {isSaving ? "Saving..." : "Save Password"}
        </Button>
      </div>
    </div>
  );
};