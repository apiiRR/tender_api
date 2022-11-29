const database = require('../config/database');

class TahapanModel {

  static count() {
    return new Promise((resolve) => {
      const sql = `SELECT COUNT(*) AS totalCount FROM tahapan`;
      database.query(sql, (err, result) => {
        resolve(result[0].totalCount);
      })
    });
  }

  static allData(currentPage) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM tahapan LIMIT 10 OFFSET ${currentPage}`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM tahapan WHERE id_tahapan = ?`;
      database.query(sql, id, (err, results) => {
        const [data] = results
        resolve(data)
      })
    })
  }
}

module.exports = TahapanModel; 