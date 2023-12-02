const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const sendMail = require("./sendMail");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

async function main() {
  try {
    app.post("/send-mail", async (req, res) => {
      const result = await sendMail(
        "This is test",
        "www.test.com",
        "jahid.dev8@gmail.com, syarafaiza00@gmail.com"
      );
      if (!result) throw new Error("Mail was not sent!");
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        result,
      });
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      message: "Something went wrong",
      error: err?.message,
    });
    console.log("Something went wrong", err);
  }
}

main().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.listen(port, () => {
  console.log("Server listening to port", port);
});

console.log({ __dirname });
