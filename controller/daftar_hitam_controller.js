const DaftarHitamModel = require("../models/daftar_hitam_model");

class DaftarHitamController {

  async index(req, res) {
    const daftarHitam = await DaftarHitamModel.allData();

    if (daftarHitam.length > 0) {
      const data = {
        message: "Get All Resource",
        data: daftarHitam
      }

      res.status(200)
        .json(data);
    } else {
      const data = {
        message: "Data is empty",
        data: []
      }

      res.status(200).json(data);
    }
  }
}

const object = new DaftarHitamController();
module.exports = object;