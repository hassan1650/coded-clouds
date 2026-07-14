import jwt from "jsonwebtoken";


const generateToken = (id, email, role) => {
    return jwt.sign(
        {
            id: id,
            email: email,
            role: role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};



export default generateToken;
