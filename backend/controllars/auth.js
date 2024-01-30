const jwt = require('jsonwebtoken');
const User = require('../db/schemas/userSchema');
const verifyToken = async (req, res) => {
  const token = req.cookies.token;
  const secretKey = 'yourSecretKe';

  if (!token) {
    return res
      .status(222)
      .json({ message: 'Unauthorized - No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return null;
      } else {
        return decoded;
      }
    });
    if (!decoded) {
      return res
        .status(222)
        .json({ message: 'Unauthorized - No token provided' });
    }
    const existUser = await User.findOne({ userId: decoded.userId });
    if (existUser && existUser.pass == decoded.pass) {
      res.status(200).json({ massage: 'token verified!' });
    } else {
      res.status(222).json({ message: 'Unauthorized - No token provided' });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = verifyToken;
