const PesertaTenderModel = require("../models/peserta_tender_model");

class PesertaTenderController {

  async index(req, res) {
    const { page } = req.query;
    let currentPage = page || 1;
    let perPage = currentPage == 1 ? 0 : (currentPage * 10) - 10;

    const totalCount = await PesertaTenderModel.count();
    if (totalCount > 0) {
      const result = await PesertaTenderModel.allData(perPage);

      const data = {
        message: "Get All Resource",
        total_data: 10,
        page: currentPage,
        data: result
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
    console.log("cek");
    const { id } = req.params;

    const result = await PesertaTenderModel.find(id);
    if (result.length > 0) {
      const data = {
        message: "Get All Resource",
        data: result
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

  async showByName(req, res) {
    const { name } = req.query;

    const result = await PesertaTenderModel.findByName(name);
    if (result.length > 0) {
      const data = {
        message: "Get All Resource",
        data: result
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

const object = new PesertaTenderController();
module.exports = object;