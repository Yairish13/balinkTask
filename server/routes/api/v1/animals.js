const express = require("express");
const router = express.Router();
const db = require('../../../index');

router.get("/", (req, res) => {
  let sql = "SELECT * FROM animals;";
  db.query(sql, (error, result) => {
    if (error) return res.json({error}) ;
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM animals WHERE animals.id=${req.params.id}`;
  db.query(sql, (error, result) => {
    if (error) return res.json({error}) ;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send("Content missing");
  }
  const { body } = req;
  const queryString = `INSERT INTO animals SET ?`;
  db.query(queryString, body, (err, result) => {
    if (err) {
      res.send("An error occurred.");
    } else {
      res.send("1 animal successfully inserted into db");
    }
  });
});

router.patch("/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send("Content missing");
  }
  const { body } = req;
  const queryString = `UPDATE animals SET ? WHERE id=${req.params.id}`;
  db.query(queryString, body, (err, result) => {
    if (err) {
      res.send("An error occurred.");
    } else {
      res.send("1 animal updated");
    }
  });
});

router.delete("/:id", (req, res) => {
  db.query(
    `DELETE FROM animals WHERE id=${req.params.id}`,
    (error, results) => {
      if (error) res.send("An error occurred");
      res.send("One animal removed");
    }
  );
});

module.exports = router;
