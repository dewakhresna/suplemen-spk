import { useState, useContext } from "react";
import instance from "@/libs/axios/instance";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useRouter } from "next/navigation";

interface PasswordFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export const useEditPassword = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const [formData, setFormData] = useState<PasswordFormData>({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Deteksi ketikan user
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Eksekusi pembaruan sandi
  const handleSaveChanges = async () => {
    // Validasi dasar di frontend sebelum dikirim ke backend
    if (!formData.oldPassword || !formData.password || !formData.confirmPassword) {
      setToaster({ type: "error", message: "Semua kolom password wajib diisi." });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setToaster({ type: "error", message: "Password baru dan konfirmasi tidak cocok." });
      return;
    }

    setIsSaving(true);
    try {
      await instance.put("/auth/password", formData);
      
      setToaster({ type: "success", message: "Password berhasil diperbarui!" });
      
      setFormData({ oldPassword: "", password: "", confirmPassword: "" });
      router.push("/profile/edit-password");
      
    } catch (error: any) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.data?.oldPassword ||
        "Terjadi kesalahan saat mengubah password.";
        
      const finalMessage = errorMessage.includes("wrong password") 
        ? "Password saat ini (lama) tidak sesuai." 
        : errorMessage;

      setToaster({ type: "error", message: finalMessage });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });
  };

  return {
    formData,
    isSaving,
    handleInputChange,
    handleSaveChanges,
    handleCancel,
  };
};