const database = require('../config/database');

class TenderModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM tender`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_tender, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta FROM tender INNER JOIN detail_tender ON tender.id_tender = detail_tender.id_tender LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT tender.*, detail_tender.id_detail_detail, detail_tender.satker, detail_tender.nilai_pagu, detail_tender.lokasi_pekerjaan, detail_tender.kab_pekerjaan, detail_tender.prov_pekerjaan, detail_tender.cara_bayar, detail_tender.jumlah_peserta FROM tender INNER JOIN detail_tender ON tender.id_tender = detail_tender.id_tender WHERE tender.id_tender = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }
}

module.exports = TenderModel; 