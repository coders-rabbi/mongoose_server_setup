import express from "express";
import { StaffController } from "./admin.controller.js";

const router = express.Router();

router.post("/create-staff", StaffController.createStaff);
router.get("/", StaffController.getAllstaffs);
router.get("/:staffId", StaffController.getSingleStaff);
router.delete("/:staffId", StaffController.deleteSingleStaff);

export const StaffRoute = router;
