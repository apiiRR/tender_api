const database = require('../config/database')

class Anggota {
  static findByNPWP(id, npwp) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM anggota_asosiasi WHERE id_pengguna = ${id} AND npwp = ${npwp}`;
      database.query(sql, (err, results) => {
        const [anggota] = results
        resolve(anggota)
      })
    })
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM anggota_asosiasi WHERE id_anggota = ?`
      database.query(sql, id, (err, results) => {
        const [user] = results
        resolve(user)
      })
    })
  }

  static findByIdPengguna(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM anggota_asosiasi WHERE id_pengguna = ?`
      database.query(sql, id, (err, results) => {
        resolve(results)
      })
    })
  }

  static async create(data) {
    const insertId = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO anggota_asosiasi SET ?`
      database.query(sql, data, (err, results) => {
        resolve(results.insertId)
      })
    })

    const user = this.findById(insertId)
    return user
  }
}

module.exports = Anggota;