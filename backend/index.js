const express = require("express");

// const userAuthendication = require("./Schema");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./Router");

mongoose
  .connect("mongodb://localhost:27017/userAuthendication")
  .then(() => {
    console.log("db  connected");
  })
  .catch(() => {
    console.log("db is not connected");
  });
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/read", (req, res) => {
  res.send("created");
});
// app.post("/create", async (req, res) => {
//   const data = await userAuthendication({
//     ...req.body,
//   });

//   const savedata = await data.save();

//   res.json(savedata);
// });

app.listen(4003, () => {
  console.log("server created port no:4003");
});
