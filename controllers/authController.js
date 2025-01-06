const usermodel = require("../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).json({
                message: "Required all fields",
                success: false
            });
        }

        const isUser = await usermodel.findOne({ username: username });
        if (isUser) {
            return res.status(400).json({
                message: "User name has taken please try another username....",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usermodel({
            username,
            password: hashedPassword,
            role
        });

        const storedUser = await user.save();
        if (!storedUser)
            res.status(400).json({
                message: "Failed to create user",
                success: false
            });
        return res.status(201).json({
            message: "User has registered successfully...",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) return res.status(400).json({
            message: "all fields are required",
            success: false
        });

        const isUser = await userModel.findOne({ username: username });
        if (!isUser) return res.status(404).json({
            message: "User not found",
            success: false
        });

        const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
        if (!isPasswordCorrect) res.status(400).json({
            message: "Username or password is incorrect",
            success: false
        });

        const token = jwt.sign({ id: isUser._id, username: isUser.username, role: isUser.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
          message: "Logged in successfully..",
          token,
          success: true
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success: false
        });
    }

}