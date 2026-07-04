import jwt from "jsonwebtoken";

export default function generateToken(userId) {

    return jwt.sign(

        {
            id: userId
        },

        import.meta.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

}