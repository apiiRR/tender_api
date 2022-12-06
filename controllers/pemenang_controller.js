const PemenangModel = require("../models/pemenang_model");

class PemenangController {

  async timeSeriesByYear(req, res) {
    const { npwp, year } = req.query;

    const detailTender = await PemenangModel.pemenangTender(npwp, year);
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

const object = new PemenangController();
module.exports = object;