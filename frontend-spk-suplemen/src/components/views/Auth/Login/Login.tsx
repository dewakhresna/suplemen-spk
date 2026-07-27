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
import { Building2, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useLogin } from "./useLogin";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
        <title>Masuk | EstatePrime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex bg-white font-sans text-slate-900">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="w-full max-w-md mt-12 lg:mt-0">
            <div className="text-center lg:text-left mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-600 mb-4">
                <Building2 size={40} strokeWidth={1.5} />
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Estate<span className="text-blue-600">Prime</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Selamat Datang Kembali
              </h1>
              <p className="text-slate-500">Silakan masuk ke akun Anda.</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              {/* Tampilkan pesan error jika ada */}
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg font-medium">
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
                  label: "font-medium text-slate-700",
                  inputWrapper:
                    "bg-slate-50 border-slate-200 hover:border-blue-400 focus-within:!border-blue-600 focus-within:!bg-white shadow-sm h-12",
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
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
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

              <div className="flex items-center justify-between mt-2">
                <Checkbox
                  size="sm"
                  isSelected={rememberMe}
                  onValueChange={setRememberMe}
                  classNames={{ label: "text-slate-600 text-sm" }}
                >
                  Ingat saya
                </Checkbox>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Lupa kata sandi?
                </button>
              </div>

              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full bg-blue-600 font-semibold text-md rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-transform mt-4"
              >
                Masuk
              </Button>

              <p className="text-center text-sm text-slate-500">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Building"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/90" />
          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Kelola properti dengan lebih cerdas.
            </h2>
            <p className="text-lg text-blue-100 max-w-lg mb-12">
              Akses analitik real-time, kelola listing, dan tanggapi pesan klien
              Anda secara langsung dari satu dashboard terpusat.
            </p>
          </div>
        </div>
      </div>

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
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
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
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isForgotLoading}
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
