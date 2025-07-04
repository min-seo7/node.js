//서버에서 요청이 들어오면 그에 맞는 요청을 진행.
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");

const mysql = require("./sql");
const customerSql = require("./sql");

const app = express();
app.use(bodyParser.json());

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 파일 다운로드 폴더 생성
const downloadDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

// 루트 확인
app.get("/", (req, res) => res.send("Root 경로"));

// 이메일 관련은 생략

// 1. 엑셀 업로드 → DB 저장
app.post("/excel", upload.single("myFile"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetJson = xlsx.utils.sheet_to_json(sheet);

    const sorted = sheetJson.sort((a, b) => a.name.localeCompare(b.name));

    for (const customer of sorted) {
      await mysql.query("customerInsert", customer);
    }

    res.send("엑셀 업로드 및 DB 저장 완료");
  } catch (err) {
    console.error("업로드 오류:", err);
    res.status(500).send("업로드 처리 실패");
  }
});

// 2. 엑셀 다운로드 → DB → 엑셀파일 생성
app.get("/excel-download", async (req, res) => {
  try {
    const customers = await mysql.query("customerList");

    const worksheet = xlsx.utils.json_to_sheet(customers);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Customers");

    const filePath = path.join(downloadDir, "customers.xlsx");
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, "customers.xlsx", (err) => {
      if (!err) fs.unlink(filePath, () => {});
    });
  } catch (err) {
    console.error("다운로드 오류:", err);
    res.status(500).send("엑셀 다운로드 실패");
  }
});

// 업로드용 HTML 폼 (선택사항)
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});

// 고객 CRUD
app.get("/customers", async (req, res) => {
  try {
    const result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.status(500).send("에러: " + err);
  }
});

app.post("/customer", async (req, res) => {
  try {
    const data = req.body.param;
    const result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.status(500).send("에러: " + err);
  }
});

app.put("/customer", async (req, res) => {
  try {
    const data = req.body.param;
    const result = await mysql.query("customerUpdate", [data, data.id]);
    res.send(result);
  } catch (err) {
    res.status(500).send("에러: " + err);
  }
});

app.delete("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    res.status(500).send("에러: " + err);
  }
});

// 서버 시작
app.listen(3000, () => {
  console.log("http://localhost:3000 running...");
});

// console.log(custSql["customerInsert"]);

// query("customerList", [
//   {
//     name: "username",
//     email: "user@email.com",
//     phone: "010-0101-0101",
//     address: "",
//   },
//   1,
// ]);
