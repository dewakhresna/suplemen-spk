import { useState, useEffect, useContext } from "react";
import instance from "@/libs/axios/instance";
import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling"; 
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
}

export const useEditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    profilePicture: "user.jpg",
  });

  const [originalPhoto, setOriginalPhoto] = useState<string>("user.jpg");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { setToaster } = useContext(ToasterContext);

  const { handleUploadFile, isPendingMutateUploadFile, handleDeleteFile } = useMediaHandling();

  const handleUploadPhoto = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const dummyOnChange = () => {};

    handleUploadFile(files, dummyOnChange, (result: any) => {
      const finalUrl = typeof result === "string" ? result : result?.fileUrl;

      if (finalUrl) {
        const currentFormPhoto = formData.profilePicture;
        
        if (currentFormPhoto && currentFormPhoto !== originalPhoto && currentFormPhoto !== "user.jpg") {
          handleDeleteFile(currentFormPhoto, () => {});
        }

        setFormData((prev) => ({ ...prev, profilePicture: finalUrl }));
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/auth/me");
        if (response.data) {
          const userData = response.data.data || response.data;
          setFormData({
            fullName: userData.fullName || "",
            username: userData.username || "",
            email: userData.email || "",
            profilePicture: userData.profilePicture || "user.jpg",
          });

          setOriginalPhoto(userData.profilePicture || "user.jpg");
        }
      } catch (error: any) {
        setToaster({ type: "error", message: "Gagal memuat data pengguna." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setToaster]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const currentPhoto = formData.profilePicture;
      
      if (currentPhoto !== originalPhoto && currentPhoto !== "user.jpg") {
        e.preventDefault();
        e.returnValue = "Anda memiliki draf foto profil yang belum disimpan. Yakin ingin meninggalkan halaman?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData.profilePicture, originalPhoto]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await instance.put("/auth/profile", formData);
      setToaster({ type: "success", message: "Profil berhasil diperbarui!" });

      if (originalPhoto && originalPhoto !== formData.profilePicture && originalPhoto !== "user.jpg") {
        handleDeleteFile(originalPhoto, () => {});
      }

      const updatedUser = response.data?.data || response.data;
      if (updatedUser) {
        setFormData((prev) => ({ ...prev, ...updatedUser }));
        setOriginalPhoto(updatedUser.profilePicture || "user.jpg");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server.";
      setToaster({ type: "error", message: errorMessage });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (formData.profilePicture !== originalPhoto && formData.profilePicture !== "user.jpg") {
      handleDeleteFile(formData.profilePicture, () => {});
    }
    router.push("/profile");
  };

  return {
    formData,
    isLoading,
    isSaving,
    isUploadingPhoto: isPendingMutateUploadFile,
    handleInputChange,
    handleSaveChanges,
    handleUploadPhoto,
    handleCancel,
  };
};