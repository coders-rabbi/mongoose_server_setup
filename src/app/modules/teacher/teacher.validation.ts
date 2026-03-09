import Joi from "joi";

const createTeacherValidationSchema = Joi.object({
  teacher: Joi.object({
    teacherId: Joi.string().required(),
    Name: Joi.object({
      firstName: Joi.string().required(),
      middleName: Joi.string().required(),
      lastName: Joi.string().required(),
    }).required(),
    designation: Joi.string().required(),
    department: Joi.string().optional(),
    gender: Joi.string().required(),
    date_of_birth: Joi.date().iso().required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      currentAddress: Joi.string().optional(),
      permanentAddress: Joi.string().optional(),
    }).required(),
    qualification: Joi.string().optional(),
    joining_date: Joi.date().iso().optional(),
    experience: Joi.number().optional(),
    specialization: Joi.string().optional(),
    status: Joi.string().valid("active", "inactive").default("active"),
  }).required(),
});

export const TeacherValidation = {
  createTeacherValidationSchema,
};
