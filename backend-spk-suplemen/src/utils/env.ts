import dotenv from "dotenv";

dotenv.config();

export const SECRET = process.env.SECRET || "secret";
export const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERVICE_NAME: string =
  process.env.EMAIL_SMTP_SERVICE_NAME || "";
export const CLIENT_HOST: string =
  process.env.CLIENT_HOST || "http://localhost:3001";

export const GROQ_API_KEY = process.env.GROQ_API_KEY || "secret";
export const DB_NAME = process.env.DB_NAME || "DB_NAME";
export const DB_USER = process.env.DB_USER || "DB_USER";
export const DB_PASS = process.env.DB_PASS || "DB_PASS";
export const DB_HOST = process.env.DB_HOST || "DB_HOST";
