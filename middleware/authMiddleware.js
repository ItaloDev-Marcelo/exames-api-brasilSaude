const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) => {
   const authHeader = req.headers['authorization'];

   const token = authHeader && authHeader.split(' ')[1]

   if(!token) {
    return res.status(400).json({
        success: false,
        message: 'Access denied. No token provided. Please login to continue.'
    })
   }

   try {
    const decodedTokenInfo  = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userInfo = decodedTokenInfo ;
    next()
   }catch(e) {
    console.log(e)
    res.status(500).json({
        success: 'false',
        message: 'Access denied. No token provided. Please login to continue.'
    })
   }
}

module.exports = authMiddleware;