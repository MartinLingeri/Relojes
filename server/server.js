const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1 }, //1 mb
});

app.post("/uploads", upload.single("customFont"), (req, res) => {
  if (req.file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  res.status(200).json({
    message: "Added custom font successfully",
    font: {
      fileName: req.file.filename,
      filePath: `http://localhost:5000/uploads/${req.file.filename}`,
    },
  });
});

app.listen(5000, () => console.log("Server started"));
