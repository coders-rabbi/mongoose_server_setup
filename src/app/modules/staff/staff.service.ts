import type { Staff } from "./staff.interface.js";
import { StaffModel } from "./staff.model.js";

const createStaffIntoDB = async (staff: Staff) => {
  const result = await StaffModel.create(staff);
  return result;
};

const getAllStaffsFromDB = async () => {
  const result = await StaffModel.find();
  return result;
};

const getSingleStaffFromDB = async (staffId: string) => {
  const result = await StaffModel.findOne({ staffId: staffId });
  return result;
};

export const StaffService = {
  createStaffIntoDB,
  getAllStaffsFromDB,
  getSingleStaffFromDB,
};
