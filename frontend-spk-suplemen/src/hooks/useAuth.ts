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
        const token = Cookies.get("token");

        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const response = await instance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data);
      } catch (error) {
        setUser(null);

        Cookies.remove("token", { path: "/" });
        
        localStorage.removeItem("chat_history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoggedIn: !!user, isLoading };
};
