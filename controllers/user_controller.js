const UserModel = require("../models/user_model");

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

    const isEmailExist = await UserModel.findByEmail(email)
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

    const user = await UserModel.create(data_user)
    const data = {
      message: "Register is successfully",
      data: user
    }

    res.status(201)
      .json(data)
  }

  async login(req, res) {
    const {
      email,
      password
    } = req.body

    const payload = { email: email };

    const user = await UserModel.findByEmail(email)

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

  async showById(req, res) {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (user) {
      const data = {
        message: "Get All Resource",
        data: user
      };

      res.status(200)
        .json(data);

    } else {
      const data = {
        message: "Resource not found",
        data: []
      }

      res.status(404)
        .json(data);
    }
  }

  async showByEmail(req, res) {
    const { email } = req.params;

    const user = await UserModel.findByEmail(email);
    if (user) {
      const data = {
        message: "Get All Resource",
        data: user
      };

      res.status(200)
        .json(data);

    } else {
      const data = {
        message: "Resource not found",
        data: []
      }

      res.status(404)
        .json(data);
    }
  }

  async update(req, res) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const {
      id
    } = req.params

    let {
      nama,
      npwp,
      alamat,
      no_telp,
      email,
      // password
    } = req.body

    const user = await UserModel.findById(id)

    if (!user) {
      const data = {
        message: "Resource not found"
      }

      res.status(404)
        .json(data)
    }

    if (nama) {
      nama = req.body.nama
    } else {
      nama = user.nama
    }

    if (npwp) {
      npwp = req.body.npwp
    } else {
      npwp = user.npwp
    }

    if (alamat) {
      alamat = req.body.alamat
    } else {
      alamat = user.alamat
    }

    if (no_telp) {
      no_telp = req.body.no_telp
    } else {
      no_telp = user.no_telp
    }

    if (email) {
      email = req.body.email
    } else {
      email = user.email
    }

    // if (password) {
    //   password = req.body.password;
    //   password = md5(password);
    // } else {
    //   password = user.password;
    // }

    let tgl_update = today.toISOString();

    let data_user = {
      nama,
      npwp,
      alamat,
      no_telp,
      email,
      // password,
      tgl_update
    }

    const updateUser = await UserModel.update(id, data_user);
    const data = {
      message: "Resource is update successfully",
      data: updateUser
    }

    res.status(200)
      .json(data)
  }

  async updatePassword(req, res) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const {
      id
    } = req.params

    let {
      current_password,
      password,
    } = req.body

    const user = await UserModel.findById(id)

    if (!user) {
      const data = {
        message: "Resource not found"
      }

      res.status(404)
        .json(data)
    }

    let passwordMD = md5(password);
    let currentPasswordMD = md5(current_password);

    if (user.password !== currentPasswordMD) {
      const data = {
        message: "Your old password is wrong",
      }

      res.status(404)
        .json(data);

      return;
    }

    if (user.password === passwordMD) {
      const data = {
        message: "Password cannot the same",
      }

      res.status(404)
        .json(data);

      return;
    }

    let tgl_update = today.toISOString();

    let data_user = {
      passwordMD,
      tgl_update
    }

    const updateUser = await UserModel.update(id, data_user);
    const data = {
      message: "Resource is update successfully",
      data: updateUser
    }

    res.status(200)
      .json(data)
  }
}


const object = new UserController()
module.exports = object