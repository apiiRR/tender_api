const database = require('../config/database');

class JadwalModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM jadwal`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM jadwal LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT jadwal.*, tahapan.nama_tahapan
      FROM jadwal 
      INNER JOIN tahapan ON jadwal.id_tahapan = tahapan.id_tahapan
      WHERE id_jadwal = ?`;
      database.query(sql, id, (err, results) => {
        resolve(results)
      })
    })
  }

  static today() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(DISTINCT id_tender) AS today FROM tenderpl_tenderp.jadwal WHERE DATEDIFF(CURDATE(),tgl_mulai) = 0;`;
      database.query(sql, (err, result) => {
        const [total] = result;
        resolve(total);
      })
    });
  }
}

module.exports = JadwalModel; 