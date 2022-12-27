const database = require('../config/database');

class PesertaTenderModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM peserta_tender`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT peserta_tender.*, peserta.nama_peserta, peserta.alamat, peserta.kelurahan, peserta.kecamatan, peserta.kabupaten, peserta.provinsi, peserta.kode_klu, peserta.klu, peserta.no_telp, peserta.email FROM peserta_tender INNER JOIN peserta ON peserta_tender.id_peserta_tender = peserta.id_peserta LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT peserta_tender.*, peserta.nama_peserta, peserta.alamat, peserta.kelurahan, peserta.kecamatan, peserta.kabupaten, peserta.provinsi, peserta.kode_klu, peserta.klu, peserta.no_telp, peserta.email FROM peserta_tender INNER JOIN peserta ON peserta_tender.id_peserta_tender = peserta.id_peserta WHERE peserta_tender.id_peserta_tender = ?`;
      database.query(sql, id, (err, results) => {
        resolve(results);
      })
    })
  }

  // static findByName(name) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT peserta_tender.*, peserta.nama_peserta, peserta.alamat, peserta.kelurahan, peserta.kecamatan, peserta.kabupaten, peserta.provinsi, peserta.kode_klu, peserta.klu, peserta.no_telp, peserta.email FROM peserta_tender JOIN peserta ON peserta_tender.npwp = peserta.npwp WHERE peserta.nama_peserta LIKE '%'${name}'%'`;
  //     database.query(sql, (err, results) => {
  //       resolve(results);
  //     })
  //   })
  // }

  static findByName(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM peserta WHERE nama_peserta LIKE '%'${name}'%'`;
      database.query(sql, (err, results) => {
        resolve(results);
      })
    })
  }

  static countByLPSE(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT peserta.nama_peserta, COUNT(peserta_tender.npwp) AS total FROM tenderpl_tenderp.peserta JOIN tenderpl_tenderp.peserta_tender ON peserta.npwp = peserta_tender.npwp WHERE peserta_tender.npwp IN (SELECT peserta_tender.npwp FROM tenderpl_tenderp.peserta_tender JOIN tenderpl_tenderp.tender ON peserta_tender.id_tender = tender.id_tender WHERE tender.id_lpse = ${id}) GROUP BY peserta_tender.npwp;`;
      database.query(sql, (err, results) => {
        resolve(results);
      })
    })
  }
}

module.exports = PesertaTenderModel; 