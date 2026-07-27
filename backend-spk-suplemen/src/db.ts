import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DB_NAME, DB_PASS, DB_USER, DB_HOST } from "./utils/env.js";

dotenv.config();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("✅ Koneksi database (Sequelize) berhasil!");
} catch (error) {
  console.error("❌ Gagal koneksi ke database:", error);
}

export default sequelize;
