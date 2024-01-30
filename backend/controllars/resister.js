const User = require('../db/schemas/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SecretKey;

const resister = async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.pass) {
    const existUser = await User.findOne({ userId: req.body.email });
    if (!existUser) {
      const newUser = new User({ userId: req.body.email, pass: req.body.pass });
      try {
        const user = await newUser.save();
        if (user) {
          res.status(200).json({ massage: 'user saved succesfully' });
          const userTok = { userId: user.userId, pass: user.pass };
          const token = jwt.sign(userTok, secretKey, { expiresIn: '1h' });
          res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'An error accured' });
      }
    } else {
      res.status(200).json({ error: 'User already exist' });
    }
  }
};

module.exports = { resister };
