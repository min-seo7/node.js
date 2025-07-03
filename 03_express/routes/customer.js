const express = require("express");
const router = express.Router();

// 여기서 "/customer"는 이미 app.js에서 지정했으므로 생략해야 함
router.get("/", (req, res) => {
  res.send("/customer 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/customer post 요청");
});

router.put("/update", (req, res) => {
  res.send("/customer put 요청");
});

router.delete("/delete", (req, res) => {
  res.send("/customer delete 요청");
});

module.exports = router;
