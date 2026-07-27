import { useState, useRef, useEffect } from "react";
import api from "@/utils/api";
import instance from "@/libs/axios/instance";
import { Message } from "./types.js";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "admin",
      text: "Halo! 👋 Selamat datang di Rumah Impianmu. Ada kriteria rumah yang sedang Anda cari hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [userFavorites, setUserFavorites] = useState<any[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedChat = localStorage.getItem("chat_history");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chat_history", JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authRes = await instance.get("/auth/me");
        const userId = authRes.data?.data?.id || authRes.data?.id;
        setCurrentUserId(userId);

        if (userId) {
          const favRes = await instance.get(`/favorites?userId=${userId}`);
          setUserFavorites(favRes.data.data);
        }
      } catch (error) {
        console.log("Mode tamu (Belum login)");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const syncChatFavorites = async () => {
      if (!currentUserId) return;

      try {
        const favRes = await instance.get(`/favorites?userId=${currentUserId}`);
        const latestFavorites = favRes.data.data;
        setUserFavorites(latestFavorites);

        setMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (!msg.houses) return msg;

            const updatedHouses = msg.houses.map((h: any) => {
              const favRecord = latestFavorites.find(
                (f: any) => f.house_id === h.id,
              );
              return {
                ...h,
                isFavorite: !!favRecord,
                favoriteId: favRecord ? favRecord.id : null,
              };
            });

            return { ...msg, houses: updatedHouses };
          }),
        );
      } catch (error) {
        console.error("Gagal sinkronisasi favorit di chat:", error);
      }
    };

    window.addEventListener("favoriteChanged", syncChatFavorites);
    return () =>
      window.removeEventListener("favoriteChanged", syncChatFavorites);
  }, [currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/chat/send", {
        pesan: userMessage.text,
      });

      const daftarRekomendasi = response.data.data.rekomendasi
        .slice(0, 3)
        .map((house: any) => {
          const isFav = userFavorites.find((f: any) => f.house_id === house.id);
          return {
            ...house,
            isFavorite: !!isFav,
            favoriteId: isFav ? isFav.id : null,
          };
        });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "admin",
          text: "Berikut adalah rekomendasi rumah terbaik berdasarkan kriteria Anda:",
          houses: daftarRekomendasi,
          outroText: "Apakah ada kriteria lain yang ingin Anda ubah?",
        },
      ]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "admin",
          text: "Maaf, sistem AI atau koneksi sedang bermasalah.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    currentUserId,
  };
}
