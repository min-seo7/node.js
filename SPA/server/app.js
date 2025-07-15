//express 생성.
//router 정보추가

const express = require("express");
require("dotenv").config({ path: "./mysql/.env" }); //DB정보!
const router = require("./router/index.js");

const app = express(); //서버생성
app.use(express.json()); //postman연결 test시 필요!
app.use(router.router);

app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("서버실행");
});
