"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { LogOut } from "lucide-react";

export default function LogoutSection() {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full h-[50vh] animate-in fade-in zoom-in-95 duration-300">
      <Card className="w-full bg-white rounded-2xl shadow-md border-none p-8 text-center">
        <CardBody className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
            <LogOut size={32} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Keluar dari akun?</h2>
            <p className="text-slate-500 mt-2">
              Anda harus masuk kembali untuk melihat rumah favorit dan mengatur profil Anda.
            </p>
          </div>
          <Button 
            color="danger" 
            className="w-full sm:w-auto px-10 mt-4 rounded-xl font-medium"
          >
            Ya, Logout Sekarang
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}