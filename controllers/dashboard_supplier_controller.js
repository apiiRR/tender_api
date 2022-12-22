const TenderModel = require("../models/tender_model");
const JadwalModel = require("../models/jadwal_model");
const PemenangModel = require("../models/pemenang_model");

class DashboardSupplierController {

  async getTotal(req, res) {
    const jumlahTender = await TenderModel.count();
    const jumlahAktif = await TenderModel.active();
    const jumlahSekarang = await JadwalModel.today();
    if (jumlahTender && jumlahAktif && jumlahSekarang) {
      const data = {
        message: "Get All Resource",
        data: {
          "total": jumlahTender,
          "aktif": jumlahAktif.active,
          "sekarang": jumlahSekarang.today,
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

  async getPemenang(req, res) {
    const pemenang = await PemenangModel.pemenangTenderByStatusTTDKontrak();
    if (pemenang) {
      const data = {
        message: "Get All Resource",
        data: pemenang
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

const object = new DashboardSupplierController();
module.exports = object;