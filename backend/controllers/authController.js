const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register User
exports.register = (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  // Check if user already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into DB
      db.query(
        "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, isAdmin],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Server error" });
          }
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
};

// Login User
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    }
  );
};

exports.getUsers = (req, res) => {
  // Admin check already done by the isAdmin middleware

  db.query("SELECT id, name, email, isAdmin FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users: results,
    });
  });
};
