import { Request, Response } from "express";
import SuplemenDetailService from "../service/suplemen_detail.service.js";

export default {
  async getBySuplemenId(req: Request, res: Response) {
    try {
      const { suplemen_id } = req.params;
      const detail = await SuplemenDetailService.findBySuplemenId(Number(suplemen_id));

      if (!detail) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen detail not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success get suplemen detail" },
        data: detail
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const files = req.files as any;
      
      if (files?.image_1) req.body.image_1 = `/uploads/${files.image_1[0].filename}`;
      if (files?.image_2) req.body.image_2 = `/uploads/${files.image_2[0].filename}`;
      if (files?.image_3) req.body.image_3 = `/uploads/${files.image_3[0].filename}`;

      const newDetail = await SuplemenDetailService.create(req.body);
      
      return res.status(201).json({
        meta: { status: 201, message: "Success create suplemen detail" },
        data: newDetail
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { suplemen_id } = req.params;
      
      const updatedData = await SuplemenDetailService.update(Number(suplemen_id), req.body);

      if (updatedData[0] === 0) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen detail not found or no changes made" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success update suplemen detail" },
        data: { suplemen_id: Number(suplemen_id), ...req.body } 
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { suplemen_id } = req.params;
      const deletedRow = await SuplemenDetailService.delete(Number(suplemen_id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen detail not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success delete suplemen detail" },
        data: null
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  },
};