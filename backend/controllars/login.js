const User = require('../db/schemas/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SecretKey;

const login = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      // console.log(err);
      res.status(204).json({ massage: 'session experied' });
    } else {
      // console.log(data);
      res.status(200).json({ userId: data.userId });
    }
  });
};

const loginPost = async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.pass) {
    const existUser = await User.findOne({ userId: req.body.email });
    if (existUser && req.body.pass == existUser.pass) {
      try {
        const user = { userId: existUser.userId, pass: existUser.pass };
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        res.send('Login successful! JWT token has been set as a cookie.');
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error accured' });
      }
    } else {
      res.status(200).json({ error: 'User already exist' });
    }
  }
};

module.exports = { login, loginPost };
