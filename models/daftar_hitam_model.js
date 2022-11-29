const database = require('../config/database');

class DaftarHitamModel {

  static allData() {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM daftar_hitam`;
      database.query(sql, (err, result) => {
        resolve(result);
      });
    });
  }
}

module.exports = DaftarHitamModel;