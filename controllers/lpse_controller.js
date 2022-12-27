const LPSEModel = require("../models/lpse_model");
const PesertaTenderModel = require("../models/peserta_tender_model");

class LPSEController {

  async showByName(req, res) {
    const { name } = req.query;

    const result = await LPSEModel.findByName(name);
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

  async countByLPSE(req, res) {
    const { id } = req.params;

    const result = await PesertaTenderModel.countByLPSE(id);
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

const object = new LPSEController();
module.exports = object;