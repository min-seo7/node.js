const mysql = require("mysql2");  //node에서 mysql DB와 연결위한 라이브러리
const sql = require("./product.js"); // {custList,} 쿼리정리

const pool = mysql.createPool({  //MySQL과 연결을 위한 풀 생성 // .env파일에 저장된 정보로 DB접근 (보안과 유연성)
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

async function query(alias, values, where = "") {  //알리아스. 쿼리문 조건절의 (?)위치에 들어갈 값, 조건절(where)
  return new Promise((resolve, reject) => {//promise생성 후 반환
    console.log(sql[alias].query + where); //디버깅용으로 쿼리출력
    pool.query(sql[alias].query + where, values, (err, result) => {  //DB에서 쿼리실행.(콜백함수)
      if (err) {
        console.log("처리중 에러", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
} // end of query.

module.exports = { query };
