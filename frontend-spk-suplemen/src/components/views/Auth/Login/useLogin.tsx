import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import authServices from "@/services/auth.service";
import instance from "@/libs/axios/instance";

export const useLogin = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("rememberedIdentifier");
    if (savedIdentifier) {
      setIdentifier(savedIdentifier);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await authServices.login({ identifier, password });
      const token = response.data.data;

      const expirationDays = rememberMe ? 30 : 1;
      Cookies.set("token", token, { expires: expirationDays });

      if (rememberMe) {
        localStorage.setItem("rememberedIdentifier", identifier);
      } else {
        localStorage.removeItem("rememberedIdentifier");
      }

      const decoded: any = jwtDecode(token);
      if (decoded.role === "admin") {
        router.push("/admin/house");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.meta?.message || "Terjadi kesalahan pada server.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotMessage({ type: "error", text: "Silakan masukkan email Anda." });
      return;
    }
    setIsForgotLoading(true);
    setForgotMessage({ type: "", text: "" });
    try {
      const res = await instance.post("/auth/forgot-password", {
        email: forgotEmail,
      });
      setForgotMessage({ type: "success", text: res.data.meta.message });
      setForgotEmail("");
    } catch (error: any) {
      const message =
        error.response?.data?.meta?.message || "Gagal mengirim email reset.";
      setForgotMessage({ type: "error", text: message });
    } finally {
      setIsForgotLoading(false);
    }
  };

  return {
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
  };
};
