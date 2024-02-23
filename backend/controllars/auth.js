const jwt = require('jsonwebtoken');
const User = require('../db/schemas/userSchema');
require('dotenv').config();
const secretKey = process.env.SecretKey;

const verifyToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    // console.log('verified1');
    return res
      .status(201)
      .json({ message: 'Unauthorized - No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // console.log('verified2');
        return res
          .status(201)
          .json({ message: 'Unauthorized - token provided is unauthorised' });
      } else {
        return decoded;
      }
    });
    const existUser = await User.findOne({ userId: decoded.userId });
    if (existUser && existUser.pass == decoded.pass) {
      // console.log('verified');
      res
        .status(200)
        .json({ massage: 'token verified!', userId: existUser.userId });
    } else {
      // console.log('verified3');
      res.status(201).json({ message: 'Unauthorized - No token provided' });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = verifyToken;
