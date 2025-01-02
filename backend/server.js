const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authController = require("./controllers/authController");
const { authenticateJWT, isAdmin } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const PORT = 4567;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/register", authController.register); // Register User
app.post("/login", authController.login); // Login User

// Example protected route
app.get("/getusers", authenticateJWT, isAdmin, authController.getUsers);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
