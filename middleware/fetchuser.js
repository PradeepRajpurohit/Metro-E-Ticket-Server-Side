const JWT = require('jsonwebtoken');
const JWT_Secret = 'Jarajarabachke';

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authonticate using valid token"})
    }
    try {
        const data = JWT.verify(token,JWT_Secret);
        req.user = data.user; 
        next()
    } catch (error) {
        res.status(401).send({error:"Please authonticate using valid token"})   
    }
}

module.exports = fetchuser;