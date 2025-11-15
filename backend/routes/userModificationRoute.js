import express from "express";
import { userModificationController, userDeleteController } from "../controllers/userModificationController.js";
import tokenMiddleware from "../middleware/tokenMiddleWare.js";

const router = express.Router();

router.put("/modify-user", tokenMiddleware ,userModificationController);
router.delete("/delete-user", tokenMiddleware, userDeleteController);


export default router;