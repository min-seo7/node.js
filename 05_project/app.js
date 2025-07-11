//05_project 구조
// mysql - .env, index.js, product.js
//node_module- 패키지
//public(html용) - index.html,
//uploads - 상품id별 이미지
//app.js
//package.json - 관련 라이브러리

const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");

const app = express(); // 서버 인스턴스 생성.

//업로드경로 확인
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//body=parser
app.use(express.json({ limit: "10mb" }));
app.use(cors()); //CORS처리 (Vue.js p201참고)

app.listen(3000, () => {
  //3000포트 서버실행.
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  //라우팅 정보(url)와 실행함수
  res.send("Root Router");
});

app.get("/fileupload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); //현재경로!
});

// 다운로드.
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  // 응답정보.
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    console.log("파일이 없습니다.");
    return res.status(404).json({ error: "Can not found file." });
  } else {
    fs.createReadStream(filepath).pipe(res);
    // res.send("다운로드 완료.");
  }
});

//업로드
app.post("/upload/:filename/:pid", (req, res) => {
  const { filename, pid } = req.params; //params는 {filename: 'sample.jpg', product:3 } 형태로 넘어옴.
  //const filePath = `${__dirname}/uploads/${pid}/${filename}`; // 파일경로 [../05_project/uploads/sample.jpg]로!
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
  }

  const safeFilename = path.basename(filename);
  const filepath = path.join(uploadDir, pid, safeFilename);

  //try{let base64data = res.body.data}

  let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8); //요청 바디의 data만! [index.htmp의 하단 바디부분 data]
  fs.writeFile(filepath, data, "base64", (err) => {
    if (err) {
      res.send("error");
    } else {
      res.send("success");
    }
  });
});

// 데이터 쿼리.
app.post("/api/:alias", async (req, res) => {
  // 라우팅정보를 통해서 실행할 쿼리지정.localhost:3000/api/productDetail
  // console.log(req.params.alias);
  console.log(req.body.param); // param: {pn:'', pp:23, ....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});

//todoList 목록
app.get("/todoList", async (req, res) => {
  const result = await query("todoList"); //product.js에 query 정의해두고 alias 호출
  console.log(result);
  res.json(result);
});
//todo삭제
app.delete("todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("todoDelete", id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
