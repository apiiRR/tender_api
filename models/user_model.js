// import database
const database = require('../config/database')

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pengguna WHERE email = ?`
      database.query(sql, email, (err, results) => {
        const [user] = results
        resolve(user)
      })
    })
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pengguna WHERE id_pengguna = ?`
      database.query(sql, id, (err, results) => {
        const [user] = results
        resolve(user)
      })
    })
  }

  static async create(data) {
    const insertId = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO pengguna SET ?`
      database.query(sql, data, (err, results) => {
        resolve(results.insertId)
      })
    })

    const user = this.findById(insertId)
    return user
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = `UPDATE pengguna SET ? WHERE id_pengguna = ?`
      database.query(sql, [data, id], (err, results) => {
        resolve(results)
      })
    })

    const user = await this.findById(id)
    return user
  }
}

module.exports = User