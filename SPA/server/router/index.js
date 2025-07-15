//라우팅정보
const express = require("express");
const router = express.Router();

const { query } = require("../mysql/index.js");

router.post("/api/:alias", async (req, res) => {
  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});

module.exports = { router };
