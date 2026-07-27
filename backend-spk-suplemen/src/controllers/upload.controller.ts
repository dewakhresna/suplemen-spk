import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export default {
  async uploadSingle(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          meta: { status: 400, message: "No file uploaded" },
          data: null,
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      return res.status(200).json({
        meta: { status: 200, message: "Success upload file" },
        data: { fileUrl: fileUrl },
      });
    } catch (error: any) {
      return res.status(500).json({
        meta: { status: 500, message: error.message },
        data: null,
      });
    }
  },

  async removeFile(req: Request, res: Response) {
    try {
      const { fileUrl } = req.body;

      if (!fileUrl) {
        return res.status(400).json({
          meta: { status: 400, message: "URL gambar tidak diberikan" },
          data: null,
        });
      }

      const filename = fileUrl.split("/").pop();

      const filePath = path.join(process.cwd(), "public", "uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.status(200).json({
          meta: { status: 200, message: "File berhasil dihapus dari server" },
          data: null,
        });
      } else {
        return res.status(404).json({
          meta: { status: 404, message: "File tidak ditemukan di server" },
          data: null,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        meta: { status: 500, message: error.message },
        data: null,
      });
    }
  },
};
