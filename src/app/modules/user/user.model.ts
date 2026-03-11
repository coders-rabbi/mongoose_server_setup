import { model, Schema } from "mongoose";
import type { TUser } from "./user.interface.js";
import bcrypt from "bcrypt";
import config from "../../config/index.js";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["student", "faculty", "admin"] },
    isDeleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const userInfo = this;
  userInfo.password = await bcrypt.hash(
    userInfo.password,
    Number(config.bycritp_salt_round),
  );
});

userSchema.post("save", async function (doc) {
  doc.password = "";
});

export const User = model<TUser>("Admin", userSchema);
