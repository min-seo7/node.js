const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");

const app = express(); //express서버의 instance 생성.
// application/json요청.
app.use(bodyParser.json());
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//파일 업로드.multer
//저장경로 + 파일명 지정.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //요청정보, 파일, 콜백함수 매개값.
    //저장경로옵션
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    //업로드 되는 파일명.
    cb(null, Date.now() + "_" + file.originalname); //업로드 파일명이 sample.jpg동일한 이름일 경우 오버라이딩 발생하니 시간추가
  },
});
//Multer 인스턴스 생성
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const mimetype = /jpg|jpeg|png|gif/.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    return cb("error", false);
  },
});
//동일출처원칙 //모든 서버에서의 요청 허락.
app.use(cors());

app.get("/", (req, res) => {
  //로컬호스트 3000번(루트)이후 라우팅
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    //현재페이지 기준 경로 지정, 인코딩방식, 콜백함수
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});
//첨부파일 업로드
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});
//express에서 에러처리하는
app.use((err, req, res, next) => {});

//첨부처리
app.post("/upload", upload.array("myFile"), (req, res) => {
  console.log(req.files); //업로드된 파일의 정보.
  // console.log(req, body); //요청몸체의 정보
  if (!req.files) {
    res.send("이미지 처리가능함.");
  } else {
  }
  res.send("업로드 완료");
});
//동일출처원칙 Cors(미들웨어)
app.get("/getCors", (req, res) => {
  let result = { id: "user01", name: "Hong" };
  res.json(result);
});

// app.get("/customer", (req, res) => {
//   res.send("/customer 경로입니다.");
// });
// app.post("/customer", (req, res) => {
//   //res.send("/customer 경로의 post요청입니다.");
//   res.js
// on({ id: 10, name: "hongkildong" });
// });

//bodyParser를 활용해서 요청정보의 body정보를 해석.
app.post("/json-data", (req, res) => {
  //postman에서 post하는 body데이터를 받아와서 출력.
  console.log(req.body); //body를 세부적 선택도 가능!
  res.send("json 요청");
});

app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("form-data 요청");
});

//라우팅정보를 파일로 분리.
app.use("/customer", customerRoute);
app.use("/product", productRoute);

app.listen(3000, () => {
  //서버실행할 포트번호 넣음
  console.log("http://localhost:3000 서버실행.");
});
