// const jwt = require('jsonwebtoken')

// const requireAuth = (req,res,next)=>{
//     const token = req.cookies.token
//     if(token){
//         jwt.verify(token,'ecommerce secret to help jwt token',(err,decodedToken)=>{
//             if(err){
//                 res.sendStatus(401)
//             }else{
//                 next()
//             }
//         })
//     }else{
//         res.sendStatus(401)
//     }
// }


// module.exports = {requireAuth}