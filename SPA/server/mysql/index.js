//DB연결
const mysql = require("mysql2");
const sql = require("./board.js");

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

async function query(alias, values, where = "") {
  return new Promise((resolve, reject) => {
    console.log(sql[alias].query + where); //디버깅용으로 쿼리확인
    pool.query(sql[alias].query + where, values, (err, result) => {
      if (err) {
        console.log("처리중 에러", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { query };
