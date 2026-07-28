import { Request, Response } from "express";
import SuplemenService from "../service/suplemen.service.js";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await SuplemenService.findAll(page, limit, search);
      const totalPages = Math.ceil(result.count / limit);

      return res.status(200).json({
        meta: {
          status: 200,
          message: "Success get all suplemens"
        },
        data: result.rows,
        pagination: {
          totalData: result.count,
          totalPages: totalPages,
          currentPage: page,
          limit: limit
        }
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const suplemen = await SuplemenService.findById(Number(id));

      if (!suplemen) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success get suplemen" },
        data: suplemen
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
      const newSuplemen = await SuplemenService.create(req.body);
      
      return res.status(201).json({
        meta: { status: 201, message: "Success create suplemen" },
        data: newSuplemen
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
      const { id } = req.params;
      
      const updatedData = await SuplemenService.update(Number(id), req.body);

      if (updatedData[0] === 0) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen not found or no changes made" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success update suplemen" },
        data: { id: Number(id), ...req.body } 
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
      const { id } = req.params;
      const deletedRow = await SuplemenService.delete(Number(id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "Suplemen not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success delete suplemen" },
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