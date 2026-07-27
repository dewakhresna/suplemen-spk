import { Response } from "express";
import { Error as SequelizeError } from "sequelize";
import * as Yup from "yup";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },

  error(res: Response, error: unknown, message: string) {
    // Error Validasi Yup
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: {
          [`${error.path}`]: error.errors[0],
        },
      });
    }

    if (error instanceof SequelizeError) {
      const isUniqueError = error.name === "SequelizeUniqueConstraintError";

      return res.status(isUniqueError ? 400 : 500).json({
        meta: {
          status: isUniqueError ? 400 : 500,
          message: isUniqueError
            ? "Data sudah digunakan (Username atau Email sudah terdaftar)"
            : error.message,
        },
        data: error.name,
      });
    }

    res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      data: error instanceof Error ? error.message : String(error),
    });
  },

  notFound(res: Response, message: string = "not found") {
    res.status(404).json({
      meta: {
        status: 404,
        message,
      },
      data: null,
    });
  },

  unauthorized(res: Response, message: string = "unauthorized") {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },

  pagination(
    res: Response,
    data: any[],
    pagination: Pagination,
    message: string,
  ) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
