import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            unique: true,
        },

        role: {
            type: String,
            enum: [
                "superadmin",
                "admin",
                "developer",
                "designer",
                "marketing",
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


});


const User = mongoose.model("User", UserSchema);

export default User;