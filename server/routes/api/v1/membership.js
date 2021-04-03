const express = require("express");
const router = express.Router();
const db = require('../../../index');


router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM balink.membership JOIN balink.person on person.id=membership.personid JOIN balink.animals on animals.id=membership.animalid WHERE person.id=${req.params.id};`;
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
  const queryString = `INSERT INTO membership SET ?`;
  db.query(queryString, body, (err, result) => {
    if (err) {
      res.send("An error occurred.");
    } else {
      res.send("1 memberships successfully inserted into db");
    }
  });
});


module.exports = router;
