import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Input, Button, Checkbox } from "@heroui/react";
import { HeartPulse, Mail, Lock, Eye, EyeOff, ArrowLeft, User, AtSign } from "lucide-react";
import { useRegister } from "./useRegister"; 
import environment from "@/config/environment";

export const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  
  const { 
    fullName, setFullName, 
    username, setUsername, 
    email, setEmail, 
    password, setPassword, 
    confirmPassword, setConfirmPassword, 
    isLoading, 
    errorMsg, 
    handleRegister 
  } = useRegister();

  const baseUrl = environment.Domain?.replace(/\/$/, "") || "http://localhost:5000";

  return (
    <>
      <Head>
        <title>Daftar Akun | Vital Prime</title>
        <link rel="icon" href={`${baseUrl}/uploads/logo-vitalprime.png`} type="image/png"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex bg-white font-sans text-slate-900">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative overflow-y-auto">
          
          <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors duration-300 font-medium">
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="w-full max-w-md mt-16 lg:mt-8 pb-8">
            <div className="text-center lg:text-left mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-red-600 mb-6 group">
                <HeartPulse size={40} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Health<span className="text-red-600">Fuel</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Bergabung dengan Vital Prime
              </h1>
              <p className="text-slate-500">Mulai perjalanan hidup sehat dan performa terbaik Anda bersama suplemen premium kami.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleRegister}>
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg font-medium shadow-sm">
                  {errorMsg}
                </div>
              )}

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
                  label: "font-semibold text-slate-800",
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

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
                  label: "font-semibold text-slate-800",
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

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
                  label: "font-semibold text-slate-800",
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

              <Input
                type={isPasswordVisible ? "text" : "password"}
                label="Kata Sandi"
                placeholder="Buat kata sandi (min. 8 karakter)"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-slate-400" />}
                endContent={
                  <button className="focus:outline-none hover:text-red-600 transition-colors" type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <EyeOff size={18} className="text-slate-400 hover:text-red-600" /> : <Eye size={18} className="text-slate-400 hover:text-red-600" />}
                  </button>
                }
                variant="bordered"
                radius="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  label: "font-semibold text-slate-800",
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

              <Input
                type={isConfirmVisible ? "text" : "password"}
                label="Konfirmasi Kata Sandi"
                placeholder="Ulangi kata sandi Anda"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-slate-400" />}
                endContent={
                  <button className="focus:outline-none hover:text-red-600 transition-colors" type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? <EyeOff size={18} className="text-slate-400 hover:text-red-600" /> : <Eye size={18} className="text-slate-400 hover:text-red-600" />}
                  </button>
                }
                variant="bordered"
                radius="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                classNames={{
                  label: "font-semibold text-slate-800",
                  inputWrapper: "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

              <div className="mt-2">
                <Checkbox color="danger" size="sm" classNames={{ label: "text-slate-600 text-sm leading-tight" }}>
                  Saya setuju dengan <Link href="#" className="text-red-600 font-medium hover:text-amber-500 transition-colors duration-300">Syarat & Ketentuan</Link> serta <Link href="#" className="text-red-600 font-medium hover:text-amber-500 transition-colors duration-300">Kebijakan Privasi</Link>.
                </Checkbox>
              </div>

              <Button 
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 font-semibold text-md rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all duration-300 mt-2 text-white border border-transparent hover:border-amber-500/30"
              >
                Daftar Sekarang
              </Button>

              <p className="text-center text-sm text-slate-500 mt-4">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="font-semibold text-red-600 hover:text-amber-500 transition-colors duration-300">
                  Masuk di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Fitness Training" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/80 to-black/95" />
          
          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Mulai perjalanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">hidup sehat</span> Anda hari ini.
            </h2>
            <p className="text-lg text-gray-300 max-w-lg mb-12">
              Dapatkan akses ke produk suplemen premium, dan raih target kebugaran dengan dukungan nutrisi terbaik dalam satu platform.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};