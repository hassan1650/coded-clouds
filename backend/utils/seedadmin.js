import bcrypt from "bcryptjs";
import User from "../model/user.js";
import ApiError from "../utils/Apierror.js";
import Apiresponse from "../utils/Apiresponse.js";
import asyncHandler from "../utils/Asychandler.js";

const createSeedAdmin = asyncHandler(async (req, res) => {
    // Check if Super Admin already exists
    const existingAdmin = await User.findOne({ role: "superadmin" });

    if (existingAdmin) {
        throw new ApiError(409, "Super Admin already exists");
    }

    const passwordHash = await bcrypt.hash("123456", 10);

    const user = await User.create({
        fullName: "M Waqas Hasan",
        email: "mwaqas@gmail.com",
        password: passwordHash,
        phoneNumber: "03001234567",
        role: "superadmin",
    });

    return Apiresponse.created(
        user,
        "Super Admin created successfully",
        200
    ).send(res);
});

export default createSeedAdmin;