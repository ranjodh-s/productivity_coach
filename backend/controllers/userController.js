import {findUserById} from "../models/userModel.js";


export async function getUserInfo(req, res) {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user info" });
    }
}