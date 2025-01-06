const userModel=require("../models/User");
const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    try {
        const authHeader =req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Token missing" });
        }

        const token=authHeader.split(" ")[1];

         // Verify the token
         const decoded = jwt.verify(token, process.env.SECRET_KEY);
         const user=await userModel.findById(decoded.id);

         if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user data to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}
module.exports = authMiddleware;