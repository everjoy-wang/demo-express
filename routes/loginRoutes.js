const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        req.session.user = results;
        res.redirect("/users");
      } else {
        res.status(401).json({ message: "账户或密码错误" });
      }
    }
  );
});

/**
 * 退出登录接口
 * @route GET /api/logout
 * @returns {object} 退出登录结果
 */
router.get("/logout", (req, res) => {
  // 清除session
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;