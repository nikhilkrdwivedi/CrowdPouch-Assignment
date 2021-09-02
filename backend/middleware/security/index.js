import jwt from 'jsonwebtoken';
import constant from '../../constant/index.js';
const extractTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } 
    return undefined;
  };
  
export const validateToken = async (req, res, next) => {

    let token = await extractTokenFromHeader(req);
    if(!token){
      return res
      .status(401)
      .json({ errorMsg: 'Access is denied, Please login again!' });
    }
    token = token.replace(/\"/g, "")
    const check = jwt.verify(token, constant.jwtSecret);
    if (!check) {
      return res
        .status(401)
        .json({ errorMsg: 'Access is denied, Please login again!' });
    }
    req.userId = check.userId
    next();
  };

export default {
    validateToken,
};

