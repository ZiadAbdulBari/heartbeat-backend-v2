const getAccess = (req,res,next)=>{
    // console.log("hello",req.role);
    if(req.role!='Guest'){
        next();
    }
    else{
        // console.log('Permission denied.');
        // console.log(req.url);
        res.status(401);
        res.redirect('back');
        // res.redirect('')
    }
}

module.exports = getAccess;