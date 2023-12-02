const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const sendMail = require("./sendMail");
const multer = require("multer");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({});

const upload = multer({ storage });

async function main() {
  try {
    app.post("/send-mail", upload.single("file"), async (req, res) => {
      console.log("file", req.file);
      console.log("body", req.body);

      if (!req?.file?.path) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }

      const fileData = {
        filename: req.file.originalname,
        path: req.file.path,
      };
      const result = await sendMail(req.body.text, fileData, req.body.email);
      if (!result)
        return res.status(500).json({
          success: false,
          message: "Mail was not sent",
        });

      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        result,
      });
    });
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err?.message,
    });
  }
}

main().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.listen(port, () => {
  console.log("Server listening to port", port);
});

// console.log({ __dirname });
