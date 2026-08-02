import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import chatController from "../controllers/chat.controller.js";
import authController from "../controllers/auth.controller.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import uploadController from "../controllers/upload.controller.js";
import userController from "../controllers/user.controller.js";
import favoriteController from "../controllers/favorite.controller.js";
import suplemenController from "../controllers/suplemen.controller.js";
import suplemenDetailController from "../controllers/suplemen_detail.controller.js";

const router = express.Router();

router.post("/chat/send", chatController.chat);


// --- RUTE SUPLEMEN ---
router.post("/suplemen/create", suplemenController.create);
router.get("/suplemen", suplemenController.getAll);
router.get("/suplemen/:id", suplemenController.getById);
router.put("/suplemen/:id", suplemenController.update);
router.delete("/suplemen/:id", suplemenController.delete);

// --- RUTE SUPLEMEN DETAILS ---
router.post(
  "/suplemen-details/create",
  uploadMiddleware.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
  ]),
  suplemenDetailController.create,
);
router.get(
  "/suplemen-details/suplemen/:suplemen_id",
  suplemenDetailController.getBySuplemenId,
);
router.put("/suplemen-details/suplemen/:suplemen_id", suplemenDetailController.update);
router.delete("/suplemen-details/suplemen/:suplemen_id", suplemenDetailController.delete);

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
