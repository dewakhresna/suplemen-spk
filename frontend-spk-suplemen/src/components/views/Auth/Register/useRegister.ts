import { useState } from "react";
import instance from "@/libs/axios/instance";
import { useRouter } from "next/navigation"; 

export const useRegister = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setErrorMsg("Semua kolom harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        fullName,
        username,
        email,
        password,
        confirmPassword, 
      };

      const response = await instance.post("/auth/register", payload);

      setSuccessMsg("Registrasi berhasil! Mengalihkan ke halaman login...");
      
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
      
    } catch (error: any) {
      const backendError = error.response?.data?.meta?.message 
                        || error.response?.data?.message 
                        || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.";
      
      setErrorMsg(backendError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName, setFullName,
    username, setUsername,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    isLoading,
    errorMsg,
    successMsg,
    handleRegister
  };
};