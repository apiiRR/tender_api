const database = require('../config/database');

class PemenangModel {
  static pemenangTender(npwp, year) {
    return new Promise((resolve) => {
      const sql = `SELECT pemenang.*, data.* FROM tenderpl_tenderp.pemenang JOIN (
        SELECT peserta_tender.*, tender.nama_tender, tender.nilai_kontrak, tender.nilai_hps FROM tenderpl_tenderp.tender JOIN tenderpl_tenderp.peserta_tender ON tender.id_tender = peserta_tender.id_tender WHERE peserta_tender.npwp = ${npwp} AND YEAR(tender.tgl_pembuatan) = ${year}
        ) AS data ON pemenang.id_tender = data.id_tender WHERE pemenang.npwp = ${npwp};`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }
}

module.exports = PemenangModel; 