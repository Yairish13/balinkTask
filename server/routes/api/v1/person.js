const router = require("express").Router();
const db = require('../../../index');


router.get("/", (_, res) => {
  const  sql = "SELECT * FROM person;";
   db.query(sql, (error, result) => {
    if (error) return res.json({error}) ;
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const sql = `SELECT * FROM balink.person WHERE person.id=${req.params.id}`;
   db.query(sql, (error, result) => {
    if (error) return res.json({error}) ;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send("Content missing");
  }
  const queryString = `INSERT INTO person SET ?`;
  db.query(queryString, body, (err, result) => {
    if (err) {
      res.send("An error occurred.");
    } else {
      res.send("1 person successfully inserted into db");
    }
  });
});
//validation joi
router.patch("/:id", (req, res) => { 
  const { body } = req;
  if (body) {
    res.status(400).send("Content missing");
  }
  const queryString = `UPDATE person SET ? WHERE id=${req.params.id}`;
  db.query(queryString, body, (err) => {
    if (err) {
      res.send("An error occurred.");
    } else {
      res.send("1 person updated");
    }
  });
});

router.delete("/:id", (req, res) => {
  db.query(
    `DELETE FROM person WHERE id=${req.params.id}`,
    (error, results) => {
      if (error) res.send("An error occurred");
      res.send("One person removed");
    }
  );
});

module.exports = router;
