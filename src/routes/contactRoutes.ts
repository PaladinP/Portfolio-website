import { Router } from "express";
import { submitContactForm } from "../controllers/contactController";

const router = Router();

// This will map to /api/contact/
router.post("/", submitContactForm);

export default router;
