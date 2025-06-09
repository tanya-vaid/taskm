import jwt from 'jsonwebtoken'
import 'dotenv/config'
const pe = process.env

const sign =(user,res)=>{
    

    
     
    
     
}    


const verify=(req, res, next)=>{
  console.log(req.headers)
  const authHeader = req.headers['cookie'];
  const token = authHeader && authHeader.split('token=')[1]; // "Bearer TOKEN"
    
    console.log(token)
    

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, pe.SECERET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
}


export default {sign,verify}