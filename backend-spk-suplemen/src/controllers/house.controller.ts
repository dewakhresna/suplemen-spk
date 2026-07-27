import { Request, Response } from "express";
import HouseService from "../service/house.service.js";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await HouseService.findAll(page, limit, search);
      const totalPages = Math.ceil(result.count / limit);

      return res.status(200).json({
        meta: {
          status: 200,
          message: "Success get all houses"
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
      const house = await HouseService.findById(Number(id));

      if (!house) {
        return res.status(404).json({
          meta: { status: 404, message: "House not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success get house" },
        data: house
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
      const newHouse = await HouseService.create(req.body);
      
      return res.status(201).json({
        meta: { status: 201, message: "Success create house" },
        data: newHouse
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
      
      const updatedData = await HouseService.update(Number(id), req.body);

      if (updatedData[0] === 0) {
        return res.status(404).json({
          meta: { status: 404, message: "House not found or no changes made" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success update house" },
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
      const deletedRow = await HouseService.delete(Number(id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "House not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success delete house" },
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