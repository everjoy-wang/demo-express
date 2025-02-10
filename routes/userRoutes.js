const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.render("users", { users: results }); // 渲染users.ejs模板，并传入查询结果
  });
});

router.post("/add", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  connection.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    }
  );
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  connection.query(
    "select * from users WHERE id = ?",
    userId,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.render("update_user", { user: result });
    }
  );
});

router.post("/update", (req, res) => {
  const { id, username, password } = req.body;
  connection.query(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [username, password, id],
    (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    }
  );
});

router.get("/del/:id", (req, res) => {
  const userId = req.params.id;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [userId],
    (error, result) => {
      if (error) throw error;
      res.redirect("/users");
    }
  );
});

module.exports = router;
