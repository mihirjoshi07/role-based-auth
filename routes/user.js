const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/auth");
const authrole=require("../middleware/authRole")
router.get("/admin",authMiddleware, authrole("admin"), (req, res) => {
    return res.status(200).json({
        message: "Welcome Admin",
        success: true
    });
})


router.get("/manager",authMiddleware, authrole("admin","manager"),(req, res) => {
    return res.status(200).json({
        message: "Welcome Manager",
        success: true
    });
})

router.get("/user",authMiddleware, authrole("admin","manager","user"),(req, res) => {
    return res.status(200).json({
        message: "Welcome User",
        success: true
    });
})

router.get("*",(req,res)=>{
    return res.status(404).json({
      message: "page not found",
      success: false
    });
})
module.exports = router;