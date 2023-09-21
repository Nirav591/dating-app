
exports.verifyToken = (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token){
    res.status(400).json("No token provided");
  }
  try{
    token === 'ABCDE';
    next();
  }catch(err){
    res.status(401).json({message: 'Unauthorized!'});  
  }
}