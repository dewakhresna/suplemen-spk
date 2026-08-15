import { Request, Response } from "express";
import { Groq } from "groq-sdk";
import { hitungTopsis, Suplemen } from "../utils/topsis.js";
import SupplementService from "../service/suplemen.service.js";
import { GROQ_API_KEY } from "../utils/env.js"; 

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export default {
  async chat(req: Request, res: Response) {
    try {
      // 1. Ekstrak pesan dan Hard Filter dari body request
      const { 
        pesan, 
        hargaMin, hargaMax, 
        kandungan_nutrisiMin, kandungan_nutrisiMax 
      } = req.body;

      if (!pesan) {
        return res.status(400).json({ message: "Pesan wajib diisi" });
      }

      // --- TAMPILAN CONSOLE: INPUT PENGGUNA ---
      console.log("\n=========================================================");
      console.log("📥 MENERIMA PESAN DARI PENGGUNA (LIVECHAT SUPLEMEN)");
      console.log("=========================================================");
      console.log(`💬 Pesan Pengguna : "${pesan}"`);
      console.log("🎯 Hard Filter:");
      console.table([{
        "Harga Min": hargaMin || "Tidak dibatasi",
        "Harga Max": hargaMax || "Tidak dibatasi",
        "Kandungan Nutrisi Min": kandungan_nutrisiMin || "Tidak dibatasi",
        "Kandungan Nutrisi Max": kandungan_nutrisiMax || "Tidak dibatasi"
      }]);

      // 2. Tarik data dari Database
      console.log("\n🗃️ QUERY KE DATABASE BERDASARKAN FILTER...");
      const rawData = await SupplementService.getFilteredForChat({
        hargaMin, 
        hargaMax, 
        kandungan_nutrisiMin, 
        kandungan_nutrisiMax
      });

      // Mapping data mentah ke interface Suplemen
      const dataSuplemen: Suplemen[] = rawData.map((r: any) => ({
        id: r.id,
        nama: r.nama ?? "Tanpa Nama",
        c1_harga: r.c1_harga ?? 0,
        c2_ulasan_negatif: r.c2_ulasan_negatif ?? 0,
        c3_kandungan_nutrisi: r.c3_kandungan_nutrisi ?? 0,
        c4_efektivitas_manfaat: r.c4_efektivitas_manfaat ?? 0,
        SuplemenDetail: r.SuplemenDetail, 
        imageUrl: r.SuplemenDetail?.image_1,
      }));

      // --- TAMPILAN CONSOLE: HASIL FILTER ---
      console.log(`✅ Ditemukan ${dataSuplemen.length} suplemen yang sesuai Hard Filter.`);
      if (dataSuplemen.length > 0) {
        console.log("Daftar Suplemen yang lolos untuk dihitung TOPSIS:");
        console.table(dataSuplemen.map(r => ({
          ID: r.id, 
          Nama_Suplemen: r.nama, 
          Harga: r.c1_harga,
          Kandungan: r.c3_kandungan_nutrisi
        })));
      }

      // Case Data Kosong
      if (dataSuplemen.length === 0) {
        console.log("❌ Eksekusi dihentikan karena tidak ada data yang sesuai filter (404 Not Found).\n");
        return res.status(404).json({ 
          status: "not_found",
          message: "Maaf, tidak ada suplemen yang sesuai dengan kriteria filter Anda. Cobalah memperluas rentang harga atau batas kandungan nutrisi.",
          data: { balasan_ai: "Saya tidak menemukan suplemen yang pas dengan filter tersebut.", rekomendasi: [] }
        });
      }

      // 3. Ekstraksi Bobot & Generate Balasan via AI Groq
      console.log("\n🤖 MENGIRIM PESAN KE AI UNTUK EKSTRAKSI BOBOT...");
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Anda adalah asisten konsultan nutrisi cerdas. Tugas Anda ada 2:
            1. Buat 1-2 kalimat balasan ramah untuk merespons chat pengguna, seolah Anda akan menyajikan rekomendasinya di bawah chat ini.
            2. Ekstrak PREFERENSI pengguna dari chat menjadi bobot angka (skala 1-5).
               1 = Tidak Penting, 3 = Cukup Penting, 5 = Sangat Penting.

            Kriteria: C1_Harga, C2_Ulasan_Negatif, C3_Kandungan_Nutrisi, C4_Efektivitas_Manfaat.
            
            Output HARUS JSON murni tanpa markdown, dengan format persis seperti ini:
            {
              "balasan_chat": "Tentu, ini beberapa rekomendasi suplemen terbaik yang sesuai dengan kebutuhan Anda...",
              "bobot": {
                "C1_Harga": 3,
                "C2_Ulasan_Negatif": 5,
                "C3_Kandungan_Nutrisi": 4,
                "C4_Efektivitas_Manfaat": 3
              }
            }`
          },
          {
            role: "user",
            content: pesan,
          },
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }, 
        temperature: 0.2, 
      });

      let aiResponse;
      try {
        aiResponse = JSON.parse(completion.choices[0].message.content || "{}");
        console.log("✅ Berhasil mengekstrak JSON dari respon AI.");
      } catch (e) {
        console.error("❌ Gagal mem-parsing JSON dari Groq:", e);
        aiResponse = {
          balasan_chat: "Berikut adalah suplemen terbaik yang berhasil saya rangkum untuk Anda.",
          bobot: { C1_Harga: 3, C2_Ulasan_Negatif: 3, C3_Kandungan_Nutrisi: 3, C4_Efektivitas_Manfaat: 3 }
        };
      }

      const bobotUser = aiResponse.bobot;
      const pesanBalasan = aiResponse.balasan_chat;

      // 4. Proses Eksekusi TOPSIS
      let hasilRekomendasi = [];
      
      if (dataSuplemen.length === 1) {
        console.log("\n⚠️ [INFO] Hanya 1 data yang lolos filter. Melewati perhitungan TOPSIS dan memberikan skor absolut 1.0000.");
        hasilRekomendasi = [{ ...dataSuplemen[0], skor: "1.0000" }];
      } else {
        console.log("\n⚙️ MENERUSKAN DATA DAN BOBOT AI KE ALGORITMA TOPSIS...");
        hasilRekomendasi = hitungTopsis(dataSuplemen, bobotUser);
      }

      // 5. Respon Final ke Frontend
      console.log("\n🚀 MENGIRIM 3 REKOMENDASI TERATAS UNTUK DITAMPILKAN KE FRONTEND\n");
      return res.status(200).json({
        status: "success",
        data: {
          balasan_ai: pesanBalasan,
          bobot_ekstraksi: bobotUser,
          rekomendasi: hasilRekomendasi.slice(0, 3), // Kirim Top 3 data
        },
      });
    } catch (error: any) {
      console.error("❌ Terjadi Kesalahan di Controller Chat:", error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};