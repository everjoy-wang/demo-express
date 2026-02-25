# AGENTS.md

## Cursor Cloud specific instructions

This is a **Library Book Management System** (图书管理系统) — a Node.js/Express server-rendered web app with EJS templates and MySQL backend. It runs on port **8080**.

### Services

| Service | How to start |
|---|---|
| MySQL | `sudo mysqld --user=mysql --daemonize --pid-file=/var/run/mysqld/mysqld.pid` |
| Node.js app (dev) | `npx nodemon app.js` (or `node app.js`) |

### Database

- MySQL must be running before starting the app.
- Connection config is hardcoded in `utils/db.js`: host=localhost, user=root, password=1234, database=book_library.
- Required tables: `admin`, `users`, `books`, `borrow_records`. See the setup notes below for schema.
- Default admin credentials: username=`admin`, password=`admin123`.

### Non-obvious caveats

- **MySQL installation in container**: `apt-get install mysql-server` may fail during postinst configuration, but the binaries and data directory are still set up. Start mysqld manually with the daemonize command above.
- **MySQL runtime directory**: Ensure `/var/run/mysqld/` exists and is owned by `mysql:mysql` before starting mysqld (`sudo mkdir -p /var/run/mysqld && sudo chown mysql:mysql /var/run/mysqld`).
- **Static files**: `app.js` serves static files from `public/` directory, but CSS files are in `css/`. The CSS won't load unless `public/` contains or links to the CSS files. The app functions without styled CSS.
- **No test framework**: `package.json` has no test script. Verify functionality manually or via curl/browser.
- **No lint tooling**: No ESLint or similar configured in the project.
- **Session store**: Uses in-memory sessions (default express-session). Sessions are lost on app restart.

### Database initialization (for fresh environments)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS book_library;
USE book_library;
CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, publisher VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS borrow_records (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, book_id INT NOT NULL, borrow_date DATE, return_date DATE, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (book_id) REFERENCES books(id));
INSERT IGNORE INTO admin (id, username, password) VALUES (1, 'admin', 'admin123');
```
