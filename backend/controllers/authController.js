import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// ========================
// Register User
// ========================

export async function registerUser(req, res) {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required."
            });

        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists."
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await createUser(
                name,
                email,
                hashedPassword
            );

        const token =
            generateToken(user.id);

        res.status(201).json({

            message: "Registration successful.",

            token,

            user

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

}



// ========================
// Login User
// ========================

export async function loginUser(req, res) {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await findUserByEmail(email);

        if (!user) {

            return res.status(401).json({

                message: "Invalid Email or Password"

            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(401).json({

                message: "Invalid Email or Password"

            });

        }

        const token =
            generateToken(user.id);

        res.json({

            message: "Login Successful",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

}