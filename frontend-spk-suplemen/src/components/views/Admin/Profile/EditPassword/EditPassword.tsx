"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Input, Button, Divider, Progress } from "@heroui/react";
import { ArrowLeft, Lock, Eye, EyeOff, Shield, CheckCircle2 } from "lucide-react";
import { useEditPassword } from "./useEditPassword";

export default function ChangePasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center py-12 px-4 sm:px-6 overflow-hidden">
      <div className="w-full max-w-[700px] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        
        <div>
          <Link 
            href="/admin/profile" 
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:bg-white hover:text-red-600 hover:shadow-md hover:shadow-red-900/5 group"
          >
            <ArrowLeft size={18} strokeWidth={2.2} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Profil
          </Link>
        </div>

        <Card className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 lg:p-12 transition-all duration-300 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full opacity-60 z-0"></div>

          <div className="relative z-10">
            <PageHeader />
            <EditPasswordContent />
          </div>
        </Card>

      </div>
    </main>
  );
}

const EditPasswordContent = () => {
  const { formData, isSaving, handleInputChange, handleSaveChanges, handleCancel } = useEditPassword();

  return (
    <div className="flex flex-col gap-10 mt-10">
      <PasswordForm formData={formData} onChange={handleInputChange} />
      {/* <SecurityTipsBox /> */}
      <ActionButtons onSave={handleSaveChanges} onCancel={handleCancel} isSaving={isSaving} />
    </div>
  );
};

const PageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 text-red-600 rounded-xl">
          <Shield size={28} strokeWidth={2} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ubah Kata Sandi
        </h1>
      </div>
      <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
        Perbarui kata sandi akun Anda untuk menjaga keamanan privasi.
      </p>
      <Divider className="my-6 bg-slate-100/60" />
    </div>
  );
};

const PasswordForm = ({ formData, onChange }: { formData: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const inputClassNames = {
    inputWrapper: "bg-slate-50 border-slate-200 shadow-sm hover:border-red-300 focus-within:!border-red-600 focus-within:!ring-4 focus-within:!ring-red-100 focus-within:!bg-white transition-all duration-300 rounded-2xl h-14 px-4",
    label: "text-slate-800 font-bold pb-1.5 text-sm",
    input: "text-slate-900 placeholder:text-slate-400 text-base font-medium tracking-wide",
  };

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { value: 0, label: "", color: "default" as const };
    
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[a-z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { value: score, label: "Lemah", color: "danger" as const };
    if (score <= 50) return { value: score, label: "Sedang", color: "warning" as const };
    if (score <= 75) return { value: score, label: "Kuat", color: "success" as const };
    return { value: score, label: "Sangat Kuat", color: "success" as const };
  };

  const strength = calculatePasswordStrength(formData.password || "");

  return (
    <form className="flex flex-col gap-7 w-full" onSubmit={(e) => e.preventDefault()}>
      
      <Input
        label="Kata Sandi Lama"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={onChange}
        labelPlacement="outside"
        placeholder="Masukkan kata sandi lama"
        variant="bordered"
        type={isVisibleCurrent ? "text" : "password"}
        startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibilityCurrent}>
            {isVisibleCurrent ? (
              <EyeOff className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
            ) : (
              <Eye className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
            )}
          </button>
        }
        classNames={inputClassNames}
      />

      <div className="flex flex-col gap-3 relative">
        <Input
          label="Kata Sandi Baru"
          name="password"
          value={formData.password}
          onChange={onChange}
          labelPlacement="outside"
          placeholder="Masukkan kata sandi baru"
          variant="bordered"
          type={isVisibleNew ? "text" : "password"}
          startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibilityNew}>
              {isVisibleNew ? (
                <EyeOff className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
              ) : (
                <Eye className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
              )}
            </button>
          }
          classNames={inputClassNames}
        />
        
        {formData.password && formData.password.length > 0 && (
          <div className="flex flex-col gap-1.5 px-1 animate-in fade-in duration-300">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">Kekuatan Sandi</span>
              <span className={
                strength.value <= 25 ? "text-red-500" :
                strength.value <= 50 ? "text-amber-500" :
                strength.value <= 75 ? "text-red-700" :
                "text-amber-600"
              }>
                {strength.label}
              </span>
            </div>
            <Progress 
              value={strength.value} 
              size="sm" 
              color={strength.color}
              classNames={{
                indicator: strength.value > 50 ? "bg-gradient-to-r from-red-600 to-amber-500" : "",
                track: "bg-slate-100"
              }}
            />
          </div>
        )}
      </div>

      <Input
        label="Konfirmasi Kata Sandi Baru"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        labelPlacement="outside"
        placeholder="Masukkan kembali kata sandi baru"
        variant="bordered"
        type={isVisibleConfirm ? "text" : "password"}
        startContent={<Lock className="text-slate-400 w-5 h-5 mr-2 shrink-0" />}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
            {isVisibleConfirm ? (
              <EyeOff className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
            ) : (
              <Eye className="text-slate-400 hover:text-red-600 transition-colors w-5 h-5" />
            )}
          </button>
        }
        classNames={inputClassNames}
      />
    </form>
  );
};

const ActionButtons = ({ onSave, onCancel, isSaving }: { onSave: () => void, onCancel: () => void, isSaving: boolean }) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      <Divider className="bg-slate-100/80" />
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
        <Button
          variant="bordered"
          onPress={onCancel}
          disabled={isSaving}
          className="w-full sm:w-auto border-2 border-red-100 text-slate-700 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700 font-bold rounded-2xl px-8 h-12 transition-all duration-300"
        >
          Batal
        </Button>
        <Button
          onPress={onSave}
          isLoading={isSaving}
          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 rounded-2xl px-10 h-12"
        >
          {isSaving ? "Menyimpan..." : "Simpan Kata Sandi"}
        </Button>
      </div>
    </div>
  );
};

const RequirementItem = ({ text, isMet }: { text: string; isMet: boolean }) => (
  <div className="flex items-center gap-2">
    <CheckCircle2 size={14} className={isMet ? "text-red-600" : "text-slate-300"} />
    <span className={`text-xs font-medium ${isMet ? "text-slate-800" : "text-slate-500"}`}>
      {text}
    </span>
  </div>
);