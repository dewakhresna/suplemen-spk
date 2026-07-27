import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Input,
  Button,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { HeartPulse, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useLogin } from "./useLogin";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Semua logika dari useLogin dipertahankan 100%
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    errorMsg,
    handleLogin,
    rememberMe,
    setRememberMe,
    isForgotModalOpen,
    setIsForgotModalOpen,
    forgotEmail,
    setForgotEmail,
    isForgotLoading,
    forgotMessage,
    handleForgotPassword,
    setForgotMessage,
  } = useLogin();

  return (
    <>
      <Head>
        <title>Masuk | Vital Prime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex bg-white font-sans text-slate-900">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors duration-300 font-medium"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="w-full max-w-md mt-12 lg:mt-0">
            <div className="text-center lg:text-left mb-10">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-red-600 mb-6 group">
                <HeartPulse
                  size={40}
                  strokeWidth={2}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Health<span className="text-red-600">Fuel</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Selamat Datang Kembali
              </h1>
              <p className="text-slate-500">
                Silakan masuk untuk melanjutkan perjalanan fitness Anda.
              </p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              {/* Tampilkan pesan error jika ada */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg font-medium flex items-center shadow-sm">
                  {errorMsg}
                </div>
              )}

              <Input
                type="text"
                label="Email atau Username"
                placeholder="Masukkan email / username"
                labelPlacement="outside"
                startContent={<Mail size={18} className="text-slate-400" />}
                variant="bordered"
                radius="lg"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                classNames={{
                  label: "font-semibold text-slate-800",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

              <Input
                type={isVisible ? "text" : "password"}
                label="Kata Sandi"
                placeholder="Masukkan kata sandi Anda"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-slate-400" />}
                endContent={
                  <button
                    className="focus:outline-none hover:text-red-600 transition-colors"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff size={18} className="text-slate-400 hover:text-red-600" />
                    ) : (
                      <Eye size={18} className="text-slate-400 hover:text-red-600" />
                    )}
                  </button>
                }
                variant="bordered"
                radius="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  label: "font-semibold text-slate-800",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-red-400 focus-within:!border-red-600 focus-within:!bg-white shadow-sm h-12 transition-colors",
                }}
              />

              <div className="flex items-center justify-between mt-2">
                <Checkbox
                  size="sm"
                  color="danger"
                  isSelected={rememberMe}
                  onValueChange={setRememberMe}
                  classNames={{ label: "text-slate-600 text-sm" }}
                >
                  Ingat saya
                </Checkbox>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-sm font-medium text-red-600 hover:text-amber-500 transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
                >
                  Lupa kata sandi?
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 font-semibold text-md rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all duration-300 mt-4 text-white border border-transparent hover:border-amber-500/30"
              >
                Masuk ke Akun
              </Button>

              <p className="text-center text-sm text-slate-500">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-red-600 hover:text-amber-500 transition-colors duration-300"
                >
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section - Image & Marketing Banner */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
            alt="Premium Fitness Lifestyle"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/80 to-black/95" />

          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Mulai perjalanan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
                hidup sehat
              </span>{" "}
              Anda hari ini.
            </h2>
            <p className="text-lg text-gray-300 max-w-lg mb-12">
              Akses suplemen terbaik, dan capai tujuan kebugaran dengan dukungan produk premium.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Lupa Kata Sandi (Dikembalikan dan disesuaikan temanya) */}
      <Modal
        isOpen={isForgotModalOpen}
        onOpenChange={(open) => {
          setIsForgotModalOpen(open);
          setForgotMessage({ type: "", text: "" });
        }}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pulihkan Kata Sandi
              </ModalHeader>
              <form onSubmit={handleForgotPassword}>
                <ModalBody>
                  <p className="text-sm text-slate-500 mb-2">
                    Masukkan email yang terdaftar. Kami akan mengirimkan kata
                    sandi sementara ke email tersebut.
                  </p>

                  {forgotMessage.text && (
                    <div
                      className={`p-3 text-sm rounded-lg font-medium ${
                        forgotMessage.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {forgotMessage.text}
                    </div>
                  )}

                  <Input
                    autoFocus
                    label="Email Terdaftar"
                    placeholder="nama@email.com"
                    variant="bordered"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    startContent={<Mail size={18} className="text-slate-400" />}
                    classNames={{
                      inputWrapper:
                        "hover:border-red-400 focus-within:!border-red-600",
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isForgotLoading}
                    className="bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Kirim Sandi Baru
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};