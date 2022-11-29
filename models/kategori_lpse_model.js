const database = require('../config/database');

class KategoriLPSEModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM kategori_lpse`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM kategori_lpse LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM kategori_lpse WHERE id_kategori = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }
}

module.exports = KategoriLPSEModel; 