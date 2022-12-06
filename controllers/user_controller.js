const User = require("../models/user_model");

const jwt = require('jsonwebtoken')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

class UserController {

  async register(req, res) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const {
      username,
      email,
      password
    } = req.body

    const isEmailExist = await User.find(email)
    if (isEmailExist) {
      const data = {
        message: "Email is Exist"
      }

      return res.status(422)
        .json(data)
    }

    let data_user = {
      nama: username,
      email: email,
      // password: await bcrypt.hash(password, 10),
      password: md5(password),
      kategori: 2,
      tgl_update: today.toISOString()
    }

    const user = await User.create(data_user)
    const data = {
      message: "Register is successfully",
      data: user
    }

    res.status(200)
      .json(data)
  }

  async login(req, res) {
    const {
      email,
      password
    } = req.body

    const payload = { email: email };

    const user = await User.searchUser(email)

    const currentPassword = md5(password);
    const passwordMatch = currentPassword === user.password;

    if (passwordMatch) {
      let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 });
      const data = {
        message: "Login is successfully",
        token: token
      }

      res.status(200)
        .json(data)
    } else {
      const data = {
        message: "Login is failed"
      }

      res.status(404)
        .json(data)
    }
  }
}

const object = new UserController()
module.exports = object