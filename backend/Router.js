const express = require("express");
const {
  postData,
  update_data,
  Delete_data,
  Login,
  get_data,
  validUser,
} = require("./crud");

const router = express.Router();

router.post("/create", postData);
router.post("/login", Login);

router.get("/getdataAll", validUser, get_data);
router.put("/update/:id", update_data);
router.delete("/delete/:id", Delete_data);
module.exports = router;
