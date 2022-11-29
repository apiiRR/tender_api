const JadwalModel = require("../models/jadwal_model");

class JadwalController {

  async index(req, res) {
    const { page } = req.query;
    let currentPage = page || 1;
    let perPage = currentPage == 1 ? 0 : (currentPage * 10) - 10;

    const totalCount = await JadwalModel.count();
    if (totalCount > 0) {
      const detailTender = await JadwalModel.allData(perPage);

      const data = {
        message: "Get All Resource",
        total_data: 10,
        page: currentPage,
        data: detailTender
      }

      res.status(200)
        .json(data);
    } else {
      const data = {
        message: "Data is Empty",
        data: []
      }

      res.status(200)
        .json(data);
    }
  }

  async showById(req, res) {
    const { id } = req.params;

    const detailTender = await JadwalModel.find(id);
    if (detailTender) {
      const data = {
        message: "Get All Resource",
        data: detailTender
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
}

const object = new JadwalController();
module.exports = object;