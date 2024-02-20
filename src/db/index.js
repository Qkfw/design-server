const { Sequelize } = require("sequelize")
const { databaseConfig } = require("../config")

class Db {
  constructor() {
    this.sequelize = this._connect()
  }
  _connect() {
    const { dbConnectURL } = databaseConfig
    const sequelize = new Sequelize(dbConnectURL, {
      dialect: "mysql",
      logging: databaseConfig.logging,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: true
        }
      }
    })
    return sequelize
  }
  // 数据库连接测试（仅供调试使用）
  connectTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Debug：数据连接成功")
      })
      .catch(err => {
        console.error("数据库连接失败:", err)
      })
  }
}

module.exports = new Db()
