const PemenangModel = require("../models/pemenang_model");

class DashboardUserController {

  async getTotal(req, res) {
    const { npwp } = req.params;

    const jumlahTender = await PemenangModel.jumlahTenderByNPWP(npwp);
    const jumlahMenang = await PemenangModel.jumlahPemenangTenderByNPWP(npwp);
    const jumlahKalah = await PemenangModel.jumlahKalahTenderByNPWP(npwp);
    const jumlahIkuti = await PemenangModel.jumlahTenderIkutByNPWP(npwp);
    if (jumlahTender && jumlahMenang && jumlahKalah && jumlahIkuti) {
      const data = {
        message: "Get All Resource",
        data: {
          "total": jumlahTender.jumlah,
          "pemenang": jumlahMenang.pemenang,
          "kalah": jumlahKalah.kalah,
          "ikuti": jumlahIkuti.ikuti,
        }
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

const object = new DashboardUserController();
module.exports = object;