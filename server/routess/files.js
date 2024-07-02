const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const multer = require("multer");
const moment = require("moment");

const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      const originalName = file.originalname || '';
      const extension = originalName.split('.').pop();
      callback(null, `image-${Date.now()}.${extension}`);
    },
  });
  

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
}).single("image");

router.post("/uploads", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(400).json({ message: "File upload failed", error: err });
    }

    const { user_id } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log(user_id,"ok");
    console.log(image);

    if (!user_id || !image) {
      return res.status(422).json({ status: 422, message: "Fill all the details" });
    }

    try {
      const upload_time = moment().format("YYYY-MM-DD HH:mm:ss");
      const insertQuery = "INSERT INTO items (user_id, image, upload_time) VALUES (?, ?, ?)";
      conn.query(insertQuery, [user_id, image, upload_time], (err, result) => {
        if (err) {
          console.error("Error inserting into database:", err);
          return res.status(500).json({ status: 500, message: "Error uploading image" });
        }
        console.log("Data added successfully");
        return res.status(201).json({ status: 201, message: "Image uploaded successfully", data: req.body });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ status: 500, message: "Error uploading image", error: error });
    }
  });
});









router.get("/getImg/:userId", (req, res) => {
    const userId = req.params.userId;
  
    const selectQuery = "SELECT * FROM items WHERE user_id = ?";
    
    conn.query(selectQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching data from database:", err);
        return res.status(500).json({ status: 500, message: "Error fetching data", error: err });
      }
  
      return res.status(200).json({  data: results });
    });
  });
  


module.exports = router;
