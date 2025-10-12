import express from "express";
import { submitForm, fetch_application_number, generate_presiged_url } from "../controllers/formController.js";


const router = express.Router();


router.post("/generate_presigned_url", generate_presiged_url);
router.post("/submit_application", submitForm);
router.get("/fetch_application_number", fetch_application_number);


export default router;