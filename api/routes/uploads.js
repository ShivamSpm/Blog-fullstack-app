import express from "express";
import { uploadImage } from "../controllers/upload.js";

const router = express.Router()

router.post("/", uploadImage)

export default router;
