const JenisTenderModel = require("../models/jenis_tender_model");

class JenisTenderController {

  async index(req, res) {
    const { page } = req.query;
    let currentPage = page || 1;
    let perPage = currentPage == 1 ? 0 : (currentPage * 10) - 10;

    const totalCount = await JenisTenderModel.count();
    if (totalCount > 0) {
      const detailTender = await JenisTenderModel.allData(perPage);

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

    const detailTender = await JenisTenderModel.find(id);
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

const object = new JenisTenderController();
module.exports = object;