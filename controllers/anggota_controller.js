const AnggotaModel = require("../models/anggota_model");

class AnggotaController {

  async create(req, res) {

    const {
      id,
      npwp
    } = req.body

    const isDataExist = await AnggotaModel.findByNPWP(id, npwp);

    if (isDataExist) {
      const data = {
        message: "NPWP is Exist"
      }

      return res.status(422)
        .json(data)
    }

    let data_anggota = {
      id_pengguna: id,
      npwp: npwp,
    }

    const anggota = await AnggotaModel.create(data_anggota)
    const data = {
      message: "Data added is successfully",
      data: anggota
    }

    res.status(201)
      .json(data)
  }

  async showById(req, res) {
    const { id } = req.params;

    const anggota = await AnggotaModel.findByIdPengguna(id);
    if (anggota) {
      const data = {
        message: "Get All Resource",
        data: anggota
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

  async destroy(req, res) {
    const {
      id
    } = req.params
    const anggota = await AnggotaModel.findById(id)

    if (anggota) {
      await AnggotaModel.delete(id)
      const data = {
        message: "Resource is delete successfully"
      }

      res.status(200)
        .json(data)
    } else {
      const data = {
        message: "Resource not found"
      }

      res.status(404)
        .json(data)
    }
  }
}

const object = new AnggotaController()
module.exports = object