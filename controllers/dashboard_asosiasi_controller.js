const PemenangModel = require("../models/pemenang_model");
const TenderModel = require("../models/tender_model");

class DashboardAsosiasiController {

  async getTotal(req, res) {
    const { id } = req.params;

    const jumlahTender = await PemenangModel.jumlahTenderByNPWPAsoasi(id);
    const jumlahMenang = await PemenangModel.jumlahPemenangTenderByNPWPAsosiasi(id);
    const jumlahKalah = await PemenangModel.jumlahKalahTenderByNPWPAsoasi(id);
    const jumlahIkuti = await PemenangModel.jumlahTenderIkutByNPWPAsosiasi(id);
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

  async getRiwayat(req, res) {
    const { npwp } = req.params;

    const tender = await TenderModel.findTenderByNPWP(npwp);
    if (tender) {
      const data = {
        message: "Get All Resource",
        data: tender
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

const object = new DashboardAsosiasiController();
module.exports = object;