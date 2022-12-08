// import database
const database = require('../config/database')

class User {
  static find(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pengguna WHERE email = ?`
      database.query(sql, email, (err, results) => {
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

    const user = this.find(insertId)
    return user
  }

  // static searchUser(email) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT * FROM pengguna WHERE email = ?`
  //     database.query(sql, email, (err, results) => {
  //       const [pengguna] = results
  //       resolve(pengguna)
  //     })
  //   })
  // }
}

module.exports = User