import z from "zod";

const userZodValidationSchema = z.object({
  userInfo: z.object({
    password: z
      .string({ message: "password must be string" })
      .min(6, { message: "Password minimum need 6 characters" })
      .max(20, { message: "Password maximum 20 characters" }), 
  }),
});

export const zodValidationSchema = {
  userZodValidationSchema,
};
