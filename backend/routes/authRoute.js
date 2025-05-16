import express from "express";
import { cadastroHandler, loginHandler } from "../controllers/register.js";

const router = express.Router();

router.post("/cadastro", cadastroHandler);
router.post("/login", loginHandler);

export default router;
