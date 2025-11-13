import express from "express";
import { userModificationController } from "../controllers/userModificationController.js";
import tokenMiddleware from "../middleware/tokenMiddleWare.js";

const router = express.Router();

router.put("/modify-user", tokenMiddleware ,userModificationController);


export default router;