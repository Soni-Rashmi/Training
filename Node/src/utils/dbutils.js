const Sequelize = require('sequelize');
const conn = {};
(function (utils) {
  utils.createConnection = function () {
    const sequelize = new Sequelize('my_db', 'root', '', {
        dialect: 'mysql',
        "host": 'localhost',
        "port": '3307',
        define: {timestamps: false}
      })
    utils.getMasterConn = function () {
      const config = require('../../config/app-config');
    }
  }
})(module.exports)
