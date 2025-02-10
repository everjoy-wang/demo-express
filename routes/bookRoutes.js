const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// 查询图书
router.get("/", (req, res) => {
  connection.query("SELECT * FROM books", (error, results) => {
    if (error) throw error;
    res.render("books", { books: results }); // 渲染books.ejs模板，并传入查询结果
  });
});

// 添加图书
router.post("/add", (req, res) => {
  const { title, author, publisher } = req.body;
  connection.query(
    "INSERT INTO books (title, author, publisher) VALUES (?, ?, ?)",
    [title, author, publisher],
    (error, result) => {
      if (error) throw error;
      res.redirect("/books");
    }
  );
});

// 修改图书
router.post("/update", (req, res) => {
  const { bookId, title, author, publisher } = req.body;
  connection.query(
    "UPDATE books SET title = ?, author = ?, publisher = ? WHERE id = ?",
    [title, author, publisher, bookId],
    (error, result) => {
      if (error) throw error;
      res.redirect("/books");
    }
  );
});

// 通过图书id查询图书信息
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  connection.query(
    "select * from books WHERE id = ?",
    userId,
    (error, result) => {
      if (error) throw error;
      res.render("update_book", { book: result });
    }
  );
});

// 删除图书
router.get("/del/:id", (req, res) => {
  const bookId = req.params.id;
  connection.query(
    "DELETE FROM books WHERE id = ?",
    [bookId],
    (error, result) => {
      if (error) throw error;
      res.redirect("/books");
    }
  );
});

module.exports = router;
