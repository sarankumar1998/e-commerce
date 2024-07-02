const express = require('express');
const router = express.Router();
const con = require("../config/db");
var moment = require("moment");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management Native
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               maritalStatus:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User has been created
 *       '400':
 *         description: Bad Request - Invalid email format
 *       '409':
 *         description: Email already exists
 *       '500':
 *         description: Internal Server Error
 */
router.post("/signup", async (req, res) => {
  // Check if email already exists
  const alreadyUserQuery = "SELECT * FROM users WHERE email = ?";
  con.query(alreadyUserQuery, [req.body.email], (err, data) => {
    if (err) {
      console.error("Error checking existing email:", err);
      return res.status(500).json("Internal Error");
    }
    if (data.length > 0) {
      return res.status(409).json("Email already exists");
    }

    const { email, username, password, dob, maritalStatus } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json("Bad Request - Invalid email format");
    }
    const dobFormatted = new Date(dob).toISOString().slice(0, 19).replace('T', ' ');

    const newUserQuery = "INSERT INTO users (email, username, password, createdAt, dob, marital_status, lastlogin) VALUES (?, ?, ?, ?, ?, ?, NULL)";
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const values = [email, username, password, createdAt, dobFormatted, maritalStatus];

    con.query(newUserQuery, values, (err, data) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).json("Error creating user");
      }
      return res.status(200).json("User has been created.");
    });
  });
});

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username or password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 */

router.post("/login", (req, res) => {
  const userLogin = "SELECT * FROM users WHERE email = ?";
  const updateUserLogin = "UPDATE users SET lastlogin = ? WHERE email = ?";

  con.query(userLogin, [req.body.email], (err, data) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    const user = data[0];
    if (req.body.password !== user.password) {
      console.log(req.body.password, user.password);
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const lastLoginTime = moment().format("YYYY-MM-DD HH:mm:ss");
    con.query(updateUserLogin, [lastLoginTime, req.body.email], (updateErr, updateData) => {
      if (updateErr) {
        console.error('Error updating lastlogin time:', updateErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Last login time updated for user:', req.body.email);
    });

    res.status(200).json({ user: { id: user.id }, message: 'Login successful' });
  });
});

/**
 * @swagger
 * /api/v1/user_by/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User details fetched successfully
 *       '500':
 *         description: Internal Server Error
 */
router.get("/user_by/:id", function (req, res) {
  let user_id = req.params.id;
  con.query(
    "SELECT * FROM users WHERE id = ?",[user_id],
    function (error, results) {
      if (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.send(results);
    }
  );
});

module.exports = router;
