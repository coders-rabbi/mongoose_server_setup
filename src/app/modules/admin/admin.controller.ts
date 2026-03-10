import type { Request, Response } from "express";
import { StaffService } from "./admin.service.js";
import { StaffValidation } from "./admin.zodValidation.js";
import { Staff } from "./admin.model.js";
import { success } from "zod";

const createStaff = async (req: Request, res: Response) => {
  try {
    const zodValidatedData =
      await StaffValidation.createStaffZodSchema.parseAsync(req.body);
    const result = await StaffService.createStaffIntoDB(zodValidatedData.staff);

    res.status(200).json({
      success: true,
      message: "Staff created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.name === "ZodError"
          ? "Validation Error"
          : error.message || "Failed to create staff",
      error: error,
    });
  }
};

const getAllstaffs = async (req: Request, res: Response) => {
  try {
    const result = await StaffService.getAllStaffsFromDB();
    res.status(200).json({
      success: true,
      message: "Staffs retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve staffs",
      error: error,
    });
  }
};

const getSingleStaff = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;
    const result = await StaffService.getSingleStaffFromDB(staffId as string);
    res.status(200).json({
      success: true,
      message: "Single Staff retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve staff",
      error: error,
    });
  }
};

const deleteSingleStaff = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;
    const result = await StaffService.deleteSingleStaffFromDB(
      staffId as string,
    );
    res.status(200).json({
      success: true,
      message: "Single Staff deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Staff deletting porccess failed ",
      error: error,
    });
  }
};

export const StaffController = {
  createStaff,
  getAllstaffs,
  getSingleStaff,
  deleteSingleStaff,
};
