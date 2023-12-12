const jwt = require('jsonwebtoken');
const tokenCheck = (req,res,next)=>{
    const {authorization} = req.headers;
    // console.log(authorization);
    try{
        const token = authorization;
        const decode = jwt.verify(token,process.env.JWT_TOKEN);
        const {id,email,role} = decode;
        req.id = id;
        req.email = email;
        req.role = role;
        next();
    }
    catch{
        res.status(401).json({
            "mgs":"Authentication Failed"
        })
        next("Authentication Failed");
    }
}

module.exports = tokenCheck;