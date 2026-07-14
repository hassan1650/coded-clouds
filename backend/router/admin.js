import { Router } from "express";
import createSeedAdmin from "../utils/seedadmin.js";

const router = Router();

router.route("/create-admin").post(createSeedAdmin);

export default router;