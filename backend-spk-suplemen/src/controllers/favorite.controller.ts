import { Request, Response } from "express";
import FavoriteService from "../service/favorite.service.js";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      
      const userId = Number(req.query.userId);

      if (!userId) {
        return res.status(400).json({
          meta: { status: 400, message: "userId is required to fetch favorites" },
          data: null
        });
      }

      const result = await FavoriteService.findAllByUser(userId, page, limit);
      const totalPages = Math.ceil(result.count / limit);

      return res.status(200).json({
        meta: {
          status: 200,
          message: "Success get all user favorites"
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

  async create(req: Request, res: Response) {
    try {
      const { user_id, suplemen_id } = req.body;

      if (!user_id || !suplemen_id) {
        return res.status(400).json({
          meta: { status: 400, message: "user_id and suplemen_id are required" },
          data: null
        });
      }

      const newFavorite = await FavoriteService.create({ user_id, suplemen_id });
      
      return res.status(201).json({
        meta: { status: 201, message: "Success add suplemen to favorites" },
        data: newFavorite
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
      const deletedRow = await FavoriteService.delete(Number(id));

      if (!deletedRow) {
        return res.status(404).json({
          meta: { status: 404, message: "Favorite record not found" },
          data: null
        });
      }

      return res.status(200).json({
        meta: { status: 200, message: "Success remove suplemen from favorites" },
        data: null
      });
    } catch (error: any) {
      return res.status(500).json({ 
        meta: { status: 500, message: error.message },
        data: null 
      });
    }
  }
};