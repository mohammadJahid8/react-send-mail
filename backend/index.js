const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

async function main() {
  try {
    app.post("/send-mail", (req, res) => {
      res.send("Server Running");
    });
  } catch (err) {
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
