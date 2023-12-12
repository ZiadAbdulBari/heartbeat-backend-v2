const jwt = require('jsonwebtoken');
// const permission = require('./permission');
const adminTokenCheck = (req,res,next)=>{
    const authentication = req.cookies;
    // console.log(token.access_token);
    try{
        const token = String(authentication.access_token);
        const decode = jwt.verify(token,process.env.JWT_TOKEN);
        const {id,email,name,role} = decode;
        // console.log(role);
        req.id = id;
        req.email = email;
        req.name = name;
        req.role = role;
        // permission(req.role)
        next();
    }
    catch{
        res.status(401)
        // .json({
        //     "mgs":"Authentication Failed"
        // })
        res.redirect('/admin/login');
        // next("Authentication Failed");
    }
}

module.exports = adminTokenCheck;