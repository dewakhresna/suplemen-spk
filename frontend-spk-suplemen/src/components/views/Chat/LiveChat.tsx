import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  Avatar,
  Select,
  SelectItem,
} from "@heroui/react";
import { Send, Activity, SlidersHorizontal } from "lucide-react";
import { useChat } from "./useChat";
import ChatBubble from "./ChatBubble";

export default function LiveChat() {
  const router = useRouter();

  const {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    currentUserId,
    filters,
    setFilters,
  } = useChat();

  const [rentangHarga, setRentangHarga] = useState<Set<string>>(new Set([]));
  const [rentangKandungan, setRentangKandungan] = useState<Set<string>>(new Set([]));

  const handleHargaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRentangHarga(new Set([val]));

    let min = "";
    let max = "";

    switch (val) {
      case "<300k":
        max = "300000";
        break;
      case "300k-600k":
        min = "300000";
        max = "600000";
        break;
      case "600k-1000k":
        min = "600000";
        max = "1000000";
        break;
      case ">1000k":
        min = "1000000";
        break;
      default:
        min = "";
        max = "";
    }

    setFilters({ ...filters, hargaMin: min, hargaMax: max });
  };

  const handleKandunganChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRentangKandungan(new Set([val]));

    let min = "";
    let max = "";

    switch (val) {
      case "20-23":
        min = "20";
        max = "23";
        break;
      case "23-26":
        min = "30";
        max = "50";
        break;
      case ">26":
        min = "26";
        break;
      default:
        min = "";
        max = "";
    }
    setFilters({ ...filters, kandungan_nutrisiMin: min, kandungan_nutrisiMax: max });
  };

  const onChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menggunakan fitur Live Chat Konsultasi AI.");
      router.push("/login");
      return;
    }

    if (input.trim()) {
      handleSendMessage(e as any);
    }
  };

  return (
    <div className="sticky top-28 h-[calc(100vh-8rem)] min-h-[500px] max-h-[700px]">
      <Card className="flex h-full flex-col rounded-3xl border border-red-50 bg-white shadow-2xl shadow-red-900/5">
        
        {/* Chat Header */}
        <CardHeader className="flex items-center gap-4 rounded-t-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 px-6 py-5 shadow-sm">
          <div className="relative">
            <Avatar 
              icon={<Activity size={24} />} 
              classNames={{ base: "bg-white text-red-600 shadow-md p-1" }} 
              size="md" 
            />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-red-700 bg-emerald-400 shadow-sm animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold leading-tight text-white tracking-wide">
              Asisten Suplemen AI
            </h4>
            <span className="text-xs text-red-100/90 font-medium mt-0.5">
              Konsultasikan suplemenmu secara instan
            </span>
          </div>
        </CardHeader>

        {/* Chat Body */}
        <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50/50 p-6 scroll-smooth">
          <p className="mb-2 text-center text-xs font-medium text-slate-400 bg-slate-100/50 rounded-full w-fit mx-auto px-3 py-1">
            Hari ini
          </p>
          
          {messages.length === 0 && (
            <div className="flex items-start gap-3 max-w-[95%]">
              <Avatar icon={<Activity size={18}/>} classNames={{base: "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md mt-1 shrink-0"}} size="sm" />
              <div className="p-3.5 text-sm shadow-sm bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm shadow-slate-200/40">
                Halo! Saya konsultan nutrisi AI Anda. Apakah ada keluhan kesehatan atau tujuan kebugaran (seperti meningkatkan daya tahan tubuh atau membentuk massa otot) yang ingin Anda capai hari ini?
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id} 
              message={msg} 
              currentUserId={currentUserId} 
            />
          ))}

          {isLoading && (
            <div className="flex max-w-[85%] items-start gap-3 animate-in fade-in duration-300">
              <Avatar icon={<Activity size={18}/>} classNames={{base: "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md mt-1 shrink-0"}} size="sm" />
              <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white p-3.5 text-sm italic text-slate-500 shadow-sm shadow-slate-200/40 flex items-center gap-2">
                Sedang menyiapkan rekomendasi suplemen terbaik
                <span className="flex gap-0.5">
                  <span className="animate-bounce inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  <span className="animate-bounce inline-block w-1 h-1 bg-red-400 rounded-full delay-100"></span>
                  <span className="animate-bounce inline-block w-1 h-1 bg-red-400 rounded-full delay-200"></span>
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-1" />
        </CardBody>

        <CardFooter className="flex-col rounded-b-3xl border-t border-slate-100 bg-white p-4 gap-3">
          
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 shrink-0 text-slate-500">
              <SlidersHorizontal size={14} />
            </div>

            <Select
              size="sm"
              placeholder="Rentang Harga"
              className="w-40 shrink-0"
              selectedKeys={rentangHarga}
              onChange={handleHargaChange}
              classNames={{
                trigger: "bg-slate-50 shadow-none border border-slate-200",
              }}
            >
              <SelectItem key="<300k">Di bawah Rp 300.000</SelectItem>
              <SelectItem key="300k-600k">Rp 300rb - 600rb</SelectItem>
              <SelectItem key="600k-1000k">Rp 600rb - 1000.000rb</SelectItem>
              <SelectItem key=">1000k">Lebih dari Rp 1000.000</SelectItem>
            </Select>

            <Select
              size="sm"
              placeholder="Kandungan Nutrisi"
              className="w-44 shrink-0"
              selectedKeys={rentangKandungan}
              onChange={handleKandunganChange}
              classNames={{
                trigger: "bg-slate-50 shadow-none border border-slate-200",
              }}
            >
              <SelectItem key="<10">Di bawah 10 gr/mg</SelectItem>
              <SelectItem key="10-30">10 - 30 gr/mg</SelectItem>
              <SelectItem key="30-50">30 - 50 gr/mg</SelectItem>
              <SelectItem key=">50">Lebih dari 50 gr/mg</SelectItem>
            </Select>
          </div>

          <form className="flex w-full items-end gap-2" onSubmit={onChatSubmit}>
            <Textarea
              minRows={1} 
              maxRows={5} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  
                  if (!currentUserId) {
                    alert("Silakan login terlebih dahulu untuk menggunakan fitur Live Chat Konsultasi AI.");
                    router.push("/login");
                    return;
                  }

                  if (input.trim()) {
                    handleSendMessage(e as any);
                  }
                }
              }}
              disabled={isLoading}
              placeholder="Ceritakan tujuan kesehatan atau keluhan Anda..."
              variant="flat"
              radius="lg"
              classNames={{
                input: "text-sm resize-none placeholder:text-slate-400",
                inputWrapper:
                  "bg-slate-100 shadow-none hover:bg-slate-200/70 focus-within:!bg-white focus-within:ring-2 focus-within:ring-red-100 items-center py-2 transition-all",
              }}
              fullWidth
            />
            <Button 
              type="submit" 
              isLoading={isLoading} 
              isIconOnly 
              className="shrink-0 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all w-12 h-12 mb-1"
            >
              {!isLoading && <Send size={18} className="ml-1" />}
            </Button>
          </form>
        </CardFooter>

      </Card>
    </div>
  );
}