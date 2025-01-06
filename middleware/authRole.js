

const authRole=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
              message: "Access Denied",
              success: false
            });            
        }
        next();
    }
}

module.exports=authRole;