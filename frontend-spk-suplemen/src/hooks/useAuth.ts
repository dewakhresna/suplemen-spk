"use client";
import { useEffect, useState } from "react";
import instance from "@/libs/axios/instance";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
const fetchUser = async () => {
      try {
        // 1. Ambil token dari cookie
        const token = Cookies.get("token");

        // 2. Jika tidak ada token, langsung batalkan pemanggilan API
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // 3. Panggil API dengan melampirkan KTP (Token) di Headers
        const response = await instance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // <-- INI KUNCI UTAMANYA!
          },
        });
        
        setUser(response.data.data); 
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoggedIn: !!user, isLoading };
};