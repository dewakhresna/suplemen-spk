import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import chatController from "../controllers/chat.controller.js";
import houseController from "../controllers/house.controller.js";
import authController from "../controllers/auth.controller.js";
import houseDetailController from "../controllers/house_detail.controller.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import uploadController from "../controllers/upload.controller.js";
import userController from "../controllers/user.controller.js";
import favoriteController from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/chat/send", chatController.chat);

// --- RUTE HOUSE ---
router.post("/houses/create", houseController.create);
router.get("/houses", houseController.getAll);
router.get("/houses/:id", houseController.getById);
router.put("/houses/:id", houseController.update);
router.delete("/houses/:id", houseController.delete);

// --- RUTE HOUSE DETAILS ---
router.post(
  "/house-details/create",
  uploadMiddleware.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
  ]),
  houseDetailController.create,
);
router.get(
  "/house-details/house/:house_id",
  houseDetailController.getByHouseId,
);
router.put("/house-details/house/:house_id", houseDetailController.update);
router.delete("/house-details/house/:house_id", houseDetailController.delete);

// RUTE ADMIN EDIT USER
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// --- RUTE FAVORITE ---
router.post("/favorites/create", favoriteController.create);
router.get("/favorites", favoriteController.getAll);
router.delete("/favorites/:id", favoriteController.delete);

// --- RUTE OTENTIKASI (USER) ---
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/activation", authController.activation);

// --- RUTE OTENTIKASI (USER) ---
router.get("/auth/me", authMiddleware, authController.me);
router.put("/auth/profile", authMiddleware, authController.updateProfile);
router.put("/auth/password", authMiddleware, authController.updatePassword);

router.post("/auth/forgot-password", authController.forgotPassword);

// --- RUTE UPLOAD FILE ---
router.post(
  "/media/upload",
  uploadMiddleware.single("file"),
  uploadController.uploadSingle,
);
router.delete("/media/remove", uploadController.removeFile);

export default router;
