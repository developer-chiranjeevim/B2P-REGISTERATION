import express from "express";
import getAllUsersController from "../controllers/getAllUsersController.js"; 
import tokenMiddleware from "../middleware/tokenMiddleWare.js";


const router = express.Router();

router.get("/get-all-users", tokenMiddleware ,getAllUsersController);


export default router;