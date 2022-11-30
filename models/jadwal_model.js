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
      WHERE id_tender = ?`;
      database.query(sql, id, (err, results) => {
        resolve(results)
      })
    })
  }
}

module.exports = JadwalModel; 