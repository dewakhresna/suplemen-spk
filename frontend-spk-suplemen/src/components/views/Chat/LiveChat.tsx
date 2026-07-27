import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Avatar,
} from "@heroui/react";
import { Send } from "lucide-react";
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
    currentUserId,
  } = useChat();

  return (
    <div className="sticky top-28 h-[calc(100vh-8rem)] min-h-[500px] max-h-[700px]">
      <Card className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
        <CardHeader className="flex items-center gap-4 rounded-t-2xl bg-blue-600 px-6 py-4">
          <div className="relative">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              size="md"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-blue-600 bg-emerald-400"></span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold leading-tight text-white">
              Assistant Rumah Impianmu
            </h4>
            <span className="text-xs text-blue-100">
              Rekomendasi Rumah Terbaik
            </span>
          </div>
        </CardHeader>

        <CardBody className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50 p-6">
          <p className="mb-2 text-center text-xs text-slate-400">Hari ini</p>

          {messages.map((msg) => (
            // --- PERBAIKAN: Lempar currentUserId ke ChatBubble ---
            <ChatBubble
              key={msg.id}
              message={msg}
              currentUserId={currentUserId}
            />
          ))}

          {isLoading && (
            <div className="flex max-w-[85%] items-start gap-2">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
                className="mt-1"
              />
              <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white p-3 text-sm italic text-slate-400 shadow-sm">
                Sedang memproses rekomendasi...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardBody>

        <CardFooter className="rounded-b-2xl border-t border-slate-100 bg-white p-4">
          <form
            className="flex w-full items-end gap-2"
            onSubmit={handleSendMessage}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Contoh: Cari rumah murah dekat stasiun..."
              variant="flat"
              radius="lg"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "bg-slate-100 shadow-none hover:bg-slate-200 focus-within:!bg-white focus-within:ring-2 focus-within:ring-blue-100",
              }}
              fullWidth
            />
            <Button
              type="submit"
              isLoading={isLoading}
              isIconOnly
              color="primary"
              className="shrink-0 rounded-lg bg-blue-600"
            >
              <Send size={18} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
