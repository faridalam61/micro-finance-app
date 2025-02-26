import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
		status: { type: String, enum: ["active", "blocked"], default: "active" },
		lastLogin: { type: Date },
	},
	{ timestamps: true }
);

// Hash user password

userSchema.pre("save", async function (next) {
	const user = this;
	user.password = await bcrypt.hash(
		user.password,
		Number(process.env.SOLT_ROUND)
	);
});

export const User = model<TUser>("user", userSchema);
