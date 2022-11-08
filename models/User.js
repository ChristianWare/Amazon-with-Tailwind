import mongoose from "mongoose";
import { stringify } from "postcss";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, reuired: true, unique: true },
    password: { type: String, reuired: true },
    isAdmin: { type: Boolean, reuired: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
