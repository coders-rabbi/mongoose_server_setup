import status from "http-status";
import AppError from "../../errors/appError.js";
import type { TAdmin } from "./admin.interface.js";
import { Admin } from "./admin.model.js";

const createAdminIntoDB = async (adminInfo: TAdmin) => {
  if (await Admin.isAdminExists(adminInfo.adminId)) {
    throw new AppError(status.CONFLICT, "Admin already exists", "");
  }
  const result = await Admin.create(adminInfo);
  return result;
};

const getAllStaffsFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleStaffFromDB = async (adminId: string) => {
  const result = await Admin.findOne({ adminId: adminId });
  return result;
};

const deleteSingleStaffFromDB = async (adminId: string) => {
  const result = await Admin.updateOne(
    { adminId: adminId },
    { isdeleted: true },
  );
  return result;
};

export const AdminService = {
  createAdminIntoDB,
  getAllStaffsFromDB,
  getSingleStaffFromDB,
  deleteSingleStaffFromDB,
};
