import jwt from "jsonwebtoken";

export default function generateToken(userId) {

    return jwt.sign(

        {
            id: userId
        },

        process.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

}