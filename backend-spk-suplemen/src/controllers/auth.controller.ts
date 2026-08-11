import { Request, Response } from "express";
import { Op } from "sequelize";
import UserModel, {
  userDTO,
  userLoginDTO,
  userUpdatePasswordDTO,
} from "../models/user.model.js";
import { encrypt } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";
import { IReqUser } from "../utils/interfaces.js";
import response from "../utils/response.js";
import { EMAIL_SMTP_USER } from "../utils/env.js";
import User from "../models/user.model.js";
import { sendMail } from "../utils/mail/mail.js";

export default {
async updateProfile(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      
      const { fullName, username, email, profilePicture } = req.body;

      if (email) {
        const checkEmail = await UserModel.findOne({
          where: { 
            email: email, 
            id: { [Op.ne]: userId }
          }
        });
        if (checkEmail) {
          return response.error(res, null, "Email sudah digunakan oleh pengguna lain");
        }
      }

      if (username) {
        const checkUsername = await UserModel.findOne({
          where: { 
            username: username, 
            id: { [Op.ne]: userId }
          }
        });
        if (checkUsername) {
          return response.error(res, null, "Username sudah digunakan oleh pengguna lain");
        }
      }

      await UserModel.update(
        { fullName, username, email, profilePicture },
        { where: { id: userId } }
      );

      const result = await UserModel.findByPk(userId);

      if (!result) return response.notFound(res, "user not found");

      return response.success(res, result, "success to update profile");
    } catch (error) {
      return response.error(res, error, "failed to update profile");
    }
  },

  async updatePassword(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const { oldPassword, password, confirmPassword } = req.body;

      await userUpdatePasswordDTO.validate({
        oldPassword,
        password,
        confirmPassword,
      });

      const user = await UserModel.findByPk(userId);

      if (!user || user.password !== encrypt(oldPassword)) {
        return response.notFound(res, "user not found or wrong password");
      }

      await UserModel.update(
        { password: encrypt(password) },
        { where: { id: userId } }
      );

      const result = await UserModel.findByPk(userId);
      return response.success(res, result, "success to update password");
    } catch (error) {
      return response.error(res, error, "failed to update password");
    }
  },

  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } = req.body;

    try {
      await userDTO.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullName,
        email,
        username,
        password,
      });

      return response.success(res, result, "success registration!");
    } catch (error) {
      return response.error(res, error, "failed registration");
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;
      await userLoginDTO.validate({ identifier, password });

      const userByIdentifier = await UserModel.findOne({
        where: {
          [Op.or]: [
            { email: identifier },
            { username: identifier }
          ],
          isActive: true,
        },
      });

      if (!userByIdentifier) {
        return response.unauthorized(res, "user not found or inactive");
      }

      const validatePassword = encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return response.unauthorized(res, "wrong password");
      }

      const token = generateToken({
        id: userByIdentifier.id,
        role: userByIdentifier.role,
      });

      return response.success(res, token, "login success");
    } catch (error) {
      return response.error(res, error, "login failed");
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const result = await UserModel.findByPk(userId);

      if (!result) return response.notFound(res, "user not found");

      return response.success(res, result, "success get user profile");
    } catch (error) {
      return response.error(res, error, "failed get user profile");
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };

      const user = await UserModel.findOne({ where: { activationCode: code } });
      
      if (!user) {
        return response.notFound(res, "invalid activation code");
      }

      await user.update({ isActive: true });

      return response.success(res, user, "user successfully activated");
    } catch (error) {
      return response.error(res, error, "user is failed activated");
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ meta: { status: 400, message: "Email wajib diisi" }, data: null });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ meta: { status: 404, message: "Email tidak terdaftar di sistem kami." }, data: null });
      }

      const randomString = Math.random().toString(36).slice(-5);
      const temporaryPassword = `EP-${randomString}#`; 

      user.password = encrypt(temporaryPassword);
      await user.save();

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h2 style="color: #dc2626;">Reset Kata Sandi</h2>
            <p>Halo <b>${user.fullName}</b>,</p>
            <p>Sistem kami telah mereset kata sandi Anda. Berikut adalah kata sandi sementara Anda untuk masuk ke Vital Prime:</p>
            <div style="background-color: #fef2f2; padding: 15px; font-size: 20px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; border-radius: 8px;">
              ${temporaryPassword}
            </div>
            <p>Segera masuk (login) menggunakan kata sandi di atas, dan <b>pastikan Anda langsung mengubahnya</b> di halaman Profil demi keamanan.</p>
          </div>
        </div>
      `;

      await sendMail({
        from: EMAIL_SMTP_USER,
        to: user.email,
        subject: "Pemulihan Kata Sandi Vital Prime",
        html: emailHtml,
      });

      return res.status(200).json({
        meta: { status: 200, message: "Kata sandi sementara telah dikirim ke email Anda." },
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