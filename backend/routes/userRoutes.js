import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getUserInfo } from "../controllers/userController.js";


const router = express.Router();

router.get("/info", protect, getUserInfo);


export default router;