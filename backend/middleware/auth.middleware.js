const jwt=require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token=req.cookies.token;
    if(!token){
       res.status(403).json({
        'message':'token is not present'
       })
    }
    const {username} = jwt.verify(token, 'secret')
    if(!username){
       res.status(403).json({
         'message':'Invalid token'
       })
    }
    else {
        req.username=username;
        next();
    } 
}
export default authMiddleware;