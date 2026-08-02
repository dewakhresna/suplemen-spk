import { useState, useRef, useEffect } from "react";
import api from "@/utils/api";
import instance from "@/libs/axios/instance";
import { Message } from "./types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "admin",
      text: "Halo! 👋 Saya konsultan nutrisi AI Anda. Silakan atur filter rentang harga dan kandungan nutrisi jika diperlukan, lalu ceritakan keluhan atau target kesehatan yang ingin Anda capai hari ini!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [userFavorites, setUserFavorites] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [filters, setFilters] = useState({
    hargaMin: "",
    hargaMax: "",
    kandungan_nutrisiMin: "",
    kandungan_nutrisiMax: "",
  });

  useEffect(() => {
    setIsMounted(true);
    const savedChat = localStorage.getItem("chat_history_suplemen");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chat_history_suplemen", JSON.stringify(messages));
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
            if (!msg.supplements) return msg;

            const updatedSupplements = msg.supplements.map((s: any) => {
              const favRecord = latestFavorites.find(
                (f: any) => f.supplement_id === s.id 
              );
              return {
                ...s,
                isFavorite: !!favRecord,
                favoriteId: favRecord ? favRecord.id : null,
              };
            });

            return { ...msg, supplements: updatedSupplements };
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
      const payload = {
        pesan: userMessage.text,
        hargaMin: filters.hargaMin ? Number(filters.hargaMin) : undefined,
        hargaMax: filters.hargaMax ? Number(filters.hargaMax) : undefined,
        kandungan_nutrisiMin: filters.kandungan_nutrisiMin ? Number(filters.kandungan_nutrisiMin) : undefined,
        kandungan_nutrisiMax: filters.kandungan_nutrisiMax ? Number(filters.kandungan_nutrisiMax) : undefined,
      };

      const response = await api.post("/chat/send", payload);

      const { balasan_ai, rekomendasi } = response.data.data;

      const daftarRekomendasi = (rekomendasi || []).map((supplement: any) => {
        const isFav = userFavorites.find(
          (f: any) => f.supplement_id === supplement.id
        );
        return {
          ...supplement,
          isFavorite: !!isFav,
          favoriteId: isFav ? isFav.id : null,
        };
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "admin",
          text:
            balasan_ai ||
            "Berikut adalah rekomendasi suplemen terbaik berdasarkan kebutuhan Anda:", 
          supplements: daftarRekomendasi,
          outroText: "Apakah ada kriteria atau keluhan lain yang ingin Anda sampaikan?",
        },
      ]);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        const errorData = error.response.data;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "admin",
            text:
              errorData.data?.balasan_ai ||
              errorData.message ||
              "Maaf, saya tidak menemukan suplemen yang sesuai dengan filter tersebut.",
          },
        ]);
      } else {
        console.error("Kesalahan Sistem/Jaringan:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "admin",
            text: "Maaf, sistem AI atau koneksi sedang bermasalah. Silakan coba lagi.",
          },
        ]);
      }
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
    filters,
    setFilters,
  };
}