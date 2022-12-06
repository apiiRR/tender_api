const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();


function AuthenticateAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (token == null) {
    res.json({ message: 'Please Login First' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.json({ message: "Please Login again, Your Session is time up" });
      } else {

        next();
      }
    });
  }
}

module.exports = AuthenticateAccessToken