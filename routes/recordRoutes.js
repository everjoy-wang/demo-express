const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const formattedDate = require("../utils/formattedDate");

// 查询借阅记录
router.get("/", (req, res) => {
  const sql = `SELECT borrow_records.id, users.username, books.title, DATE_FORMAT(borrow_records.borrow_date, '%Y-%m-%d') AS borrow_date, DATE_FORMAT(borrow_records.return_date, '%Y-%m-%d') AS return_date
  FROM borrow_records
  JOIN users ON borrow_records.user_id = users.id
  JOIN books ON borrow_records.book_id = books.id`;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.render("records", { records: results }); // 渲染borrow-records.ejs模板，并传入查询结果
  });
});

// 借阅图书
router.post("/add", (req, res) => {
  const { userId, bookId } = req.body;
  connection.query(
    "INSERT INTO borrow_records (user_id, book_id, borrow_date) VALUES (?, ?, ?)",
    [userId, bookId, formattedDate],
    (error, result) => {
      if (error) throw error;
      res.redirect("/records");
    }
  );
});

// 归还图书
router.get("/update/:id", (req, res) => {
  const recordId = req.params.id;
  const return_date = new Date().toISOString().slice(0, 10); // 当前日期作为归还日期
  connection.query(
    "UPDATE borrow_records SET return_date = ? WHERE id = ?",
    [return_date, recordId],
    (error, result) => {
      if (error) throw error;
      res.redirect("/records");
    }
  );
});

module.exports = router;
