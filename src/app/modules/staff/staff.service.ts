import type { TStaff } from "./staff.interface.js";
import { Staff } from "./staff.model.js";

const createStaffIntoDB = async (staff: TStaff) => {
  if (await Staff.isStaffExists(staff.staffId)) {
    throw new Error("Staff already exists");
  }
  const result = await Staff.create(staff);
  return result;
};

const getAllStaffsFromDB = async () => {
  const result = await Staff.find();
  return result;
};

const getSingleStaffFromDB = async (staffId: string) => {
  const result = await Staff.findOne({ staffId: staffId });
  return result;
};

const deleteSingleStaffFromDB = async (staffId: string) => {
  const result = await Staff.updateOne(
    { staffId: staffId },
    { isdeleted: true },
  );
  return result;
};

export const StaffService = {
  createStaffIntoDB,
  getAllStaffsFromDB,
  getSingleStaffFromDB,
  deleteSingleStaffFromDB,
};
