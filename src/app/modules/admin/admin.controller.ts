import type { Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import { AdminValidation } from "./admin.zodValidation.js";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const zodValidatedData =
      await AdminValidation.createAdminZodSchema.parseAsync(req.body);
    const result = await AdminService.createAdminIntoDB(zodValidatedData.adminInfo);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.name === "ZodError"
          ? "Validation Error"
          : error.message || "Failed to create admin",
      error: error,
    });
  }
};

const getAllstaffs = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllStaffsFromDB();
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
    const result = await AdminService.getSingleStaffFromDB(staffId as string);
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
    const result = await AdminService.deleteSingleStaffFromDB(
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
  createStaff: createAdmin,
  getAllstaffs,
  getSingleStaff,
  deleteSingleStaff,
};
