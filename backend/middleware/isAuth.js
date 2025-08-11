import jwt from 'jsonwebtoken'


const isAuth=async(req,res,next)=>{
  try {
    
     const {token}=req.headers;
    
        if(!token){
              return res.json({success:false,message:"user does not have token"})
        }
      const verifytoken=jwt.verify(token,process.env.JWT_SECRET)
      if(!verifytoken){
        return  res.json({success:false,message:"user does not have valid token"})
      }
      req.userId=verifytoken.id
      next()
    
  } catch (error) {
    console.log(error)
      return res.json({message:'is auth errro'})
  }
}
export default isAuth;