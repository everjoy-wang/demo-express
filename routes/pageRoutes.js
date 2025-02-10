const express = require("express");
const router = express.Router();

const db = require("../utils/db");

router.get("/", (req, res) => {
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/page_user", (req, res) => {
  res.render("add_user");
});

router.get("/page_book", (req, res) => {
  res.render("add_book");
});

router.get("/page_record", (req, res) => {
  const sqlUsers = "SELECT id, username FROM users";
  const sqlBooks = "SELECT id, title FROM books";
  db.query(sqlUsers, (err, usersResult) => {
    if (err) throw err;
    const users = usersResult.map((user) => ({
      id: user.id,
      name: user.username,
    }));
    db.query(sqlBooks, (err, booksResult) => {
      if (err) throw err;
      const books = booksResult.map((book) => ({
        id: book.id,
        title: book.title,
      }));
      res.render("add_record", { users, books });
    });
  });
});

module.exports = router;