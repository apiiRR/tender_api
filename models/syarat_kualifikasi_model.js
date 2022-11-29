const database = require('../config/database');

class SyaratKualifikasiModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM syarat_kualifiaksi`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM syarat_kualifiaksi LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM syarat_kualifiaksi WHERE id_syarat = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }
}

module.exports = SyaratKualifikasiModel; 