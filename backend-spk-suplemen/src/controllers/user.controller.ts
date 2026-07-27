import { Request, Response } from "express";
import UserService from "../service/user.service.js";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await UserService.findAll(page, limit, search);
      const totalPages = Math.ceil(result.count / limit);

      return res.status(200).json({
        meta: {
          status: 200,
          message: "Success get all users"
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
      const user = await UserService.findById(Number(id));

      if (!user) {
        return res.status(404).json({
          meta: { status: 404, message: "User not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success get user" },
        data: user
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
      
      const updatedData = await UserService.update(Number(id), req.body);

      if (updatedData[0] === 0) {
        return res.status(404).json({
          meta: { status: 404, message: "User not found or no changes made" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success update user" },
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
      const deletedRow = await UserService.delete(Number(id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "User not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success delete user" },
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