import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Input, Button, Checkbox } from "@heroui/react";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  AtSign,
} from "lucide-react";
import { useRegister } from "./useRegister";

export const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const {
    fullName,
    setFullName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    errorMsg,
    handleRegister,
  } = useRegister();

  return (
    <>
      <Head>
        <title>Daftar Akun | EstatePrime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex bg-white font-sans text-slate-900">
        {/* Kiri: Area Form Register (Scrollable untuk form panjang) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative overflow-y-auto">
          {/* Tombol Kembali ke Beranda */}
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="w-full max-w-md mt-16 lg:mt-8 pb-8">
            <div className="text-center lg:text-left mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-600 mb-6">
                <Building2 size={40} strokeWidth={1.5} />
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Estate<span className="text-blue-600">Prime</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Buat Akun Baru
              </h1>
              <p className="text-slate-500">
                Bergabunglah dan temukan rumah impian Anda.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleRegister}>
              {/* Pesan Error */}
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Input Full Name */}
              <Input
                type="text"
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                labelPlacement="outside"
                startContent={<User size={18} className="text-slate-400" />}
                variant="bordered"
                radius="lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                classNames={{
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
                }}
              />

              {/* Input Username */}
              <Input
                type="text"
                label="Username"
                placeholder="Pilih username"
                labelPlacement="outside"
                startContent={<AtSign size={18} className="text-slate-400" />}
                variant="bordered"
                radius="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                classNames={{
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
                }}
              />

              {/* Input Email */}
              <Input
                type="email"
                label="Email"
                placeholder="contoh@email.com"
                labelPlacement="outside"
                startContent={<Mail size={18} className="text-slate-400" />}
                variant="bordered"
                radius="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
                }}
              />

              {/* Input Password */}
              <Input
                type={isPasswordVisible ? "text" : "password"}
                label="Kata Sandi"
                placeholder="Buat kata sandi (min. 8 karakter)"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-slate-400" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={18} className="text-slate-400" />
                    ) : (
                      <Eye size={18} className="text-slate-400" />
                    )}
                  </button>
                }
                variant="bordered"
                radius="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
                }}
              />

              {/* Input Confirm Password */}
              <Input
                type={isConfirmVisible ? "text" : "password"}
                label="Konfirmasi Kata Sandi"
                placeholder="Ulangi kata sandi Anda"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-slate-400" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleConfirmVisibility}
                  >
                    {isConfirmVisible ? (
                      <EyeOff size={18} className="text-slate-400" />
                    ) : (
                      <Eye size={18} className="text-slate-400" />
                    )}
                  </button>
                }
                variant="bordered"
                radius="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                classNames={{
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
                }}
              />

              {/* Terms and Conditions */}
              <div className="mt-2">
                <Checkbox
                  size="sm"
                  classNames={{ label: "text-slate-600 text-sm leading-tight" }}
                >
                  Saya setuju dengan{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Syarat & Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Kebijakan Privasi
                  </Link>
                  .
                </Checkbox>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full bg-blue-600 font-semibold text-md rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-transform mt-2"
              >
                Daftar Sekarang
              </Button>

              {/* Link ke Login */}
              <p className="text-center text-sm text-slate-500 mt-4">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Villa"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/90" />
          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Langkah pertama menuju hunian impian Anda.
            </h2>
            <p className="text-lg text-blue-100 max-w-lg mb-12">
              Daftar sekarang untuk menyimpan properti favorit, mengatur jadwal
              survei, dan berkomunikasi langsung dengan agen terbaik kami.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
