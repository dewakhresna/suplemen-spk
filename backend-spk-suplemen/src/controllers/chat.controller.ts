import { Request, Response } from "express";
import { Groq } from "groq-sdk";
import { hitungTopsis, Rumah } from "../utils/topsis.js";
import HouseService from "../service/house.service.js";
import { GROQ_API_KEY } from "../utils/env.js"; 

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export default {
  async chat(req: Request, res: Response) {
    try {
      const { pesan } = req.body;

      if (!pesan) {
        return res.status(400).json({ message: "Pesan wajib diisi" });
      }

      const rawData = await HouseService.getAllForChat();

      const dataRumah: Rumah[] = rawData.map((r: any) => ({
        id: r.id,
        nama: r.nama ?? "Tanpa Nama",
        c1_harga: r.c1_harga ?? 0,
        c2_jarak: r.c2_jarak ?? 0,
        c3_keamanan: r.c3_keamanan ?? 0,
        c4_luas: r.c4_luas ?? 0,
        HouseDetail: r.HouseDetail, 
        imageUrl: r.HouseDetail?.image_1,
      }));

      if (dataRumah.length === 0) {
        return res
          .status(404)
          .json({ message: "Data rumah kosong di database" });
      }

      // 1. Ekstraksi Bobot via AI
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Tugas Anda adalah mengekstrak PREFERENSI (Tingkat Kepentingan) user menjadi bobot angka.
                    Gunakan skala 1 sampai 5:
                    1 = Tidak Penting (User mengabaikan kriteria ini)
                    3 = Cukup Penting (Standar)
                    5 = Sangat Penting (User sangat menekankan kriteria ini)

                    Kriteria:
                    C1_Harga, C2_Jarak, C3_Keamanan, C4_Luas

                    Output HARUS hanya JSON murni tanpa markdown atau penjelasan. 
                    Format: {"C1_Harga": x, "C2_Jarak": x, "C3_Keamanan": x, "C4_Luas": x}`,
          },
          {
            role: "user",
            content: pesan,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0,
      });

      const bobotUser = JSON.parse(
        completion.choices[0].message.content || "{}",
      );

      const hasil = hitungTopsis(dataRumah, bobotUser);

      // Respon
      return res.status(200).json({
        status: "success",
        data: {
          bobot: bobotUser,
          rekomendasi: hasil,
        },
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
