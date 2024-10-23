const express = require("express");
const router = express.Router();
const sql = require("../models/tipo.model");


router.get("/todos", (req, res) =>
  sql.getTodos().then((resposta) => {
    if (resposta instanceof Error) {
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
  })
);
module.exports = router;
