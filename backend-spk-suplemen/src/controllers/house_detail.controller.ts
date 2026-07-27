import { Request, Response } from "express";
import HouseDetailService from "../service/house_detail.service.js";

export default {
  async getByHouseId(req: Request, res: Response) {
    try {
      const { house_id } = req.params;
      const detail = await HouseDetailService.findByHouseId(Number(house_id));

      if (!detail) {
        return res.status(404).json({
          meta: { status: 404, message: "House detail not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success get house detail" },
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

      const newDetail = await HouseDetailService.create(req.body);
      
      return res.status(201).json({
        meta: { status: 201, message: "Success create house detail" },
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
      const { house_id } = req.params;
      
      const updatedData = await HouseDetailService.update(Number(house_id), req.body);

      if (updatedData[0] === 0) {
        return res.status(404).json({
          meta: { status: 404, message: "House detail not found or no changes made" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success update house detail" },
        data: { house_id: Number(house_id), ...req.body } 
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
      const { house_id } = req.params;
      const deletedRow = await HouseDetailService.delete(Number(house_id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "House detail not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success delete house detail" },
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