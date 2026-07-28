import { Card, CardHeader, CardBody, CardFooter, Input, Button, Avatar } from "@heroui/react";
import { Send, Activity } from "lucide-react";
import { useChat } from "./useChat";
import ChatBubble from "./ChatBubble";

export default function LiveChat() {
  const { 
    messages, 
    input, 
    setInput, 
    isLoading, 
    messagesEndRef, 
    handleSendMessage, 
    currentUserId 
  } = useChat();

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
              Konsultasikan suplmenmu secara instan
            </span>
          </div>
        </CardHeader>

        {/* Chat Body */}
        <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50/50 p-6 scroll-smooth">
          <p className="mb-2 text-center text-xs font-medium text-slate-400 bg-slate-100/50 rounded-full w-fit mx-auto px-3 py-1">
            Hari ini
          </p>
          
          {/* Default initial message (Optional, if chat is empty) */}
          {messages.length === 0 && (
            <div className="flex items-start gap-3 max-w-[95%]">
              <Avatar icon={<Activity size={18}/>} classNames={{base: "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md mt-1 shrink-0"}} size="sm" />
              <div className="p-3.5 text-sm shadow-sm bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm shadow-slate-200/40">
                Halo! Saya konsultan nutrisi AI Anda. Apakah ada keluhan kesehatan atau tujuan kebugaran (seperti meningkatkan daya tahan tubuh atau membentuk massa otot) yang ingin Anda capai hari ini?
              </div>
            </div>
          )}

          {/* Render ChatBubble dengan currentUserId */}
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

        {/* Chat Input */}
        <CardFooter className="rounded-b-3xl border-t border-slate-100 bg-white p-4 sm:p-5">
          <form className="flex w-full items-end gap-2.5" onSubmit={handleSendMessage}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Contoh: Saya ingin vitamin untuk meningkatkan imun..."
              variant="flat"
              radius="lg"
              classNames={{
                input: "text-sm placeholder:text-slate-400",
                inputWrapper: "bg-slate-100 shadow-none hover:bg-slate-200/70 focus-within:!bg-white focus-within:ring-2 focus-within:ring-red-100 transition-all",
              }}
              fullWidth
            />
            <Button 
              type="submit" 
              isLoading={isLoading} 
              isIconOnly 
              className="shrink-0 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all w-12 h-12"
            >
              {!isLoading && <Send size={18} className="ml-1" />}
            </Button>
          </form>
        </CardFooter>

      </Card>
    </div>
  );
}