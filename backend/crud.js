const userAuthendication = require("./Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postData = async (req, res) => {
  const hasspassword = await bcrypt.hash(req.body.password, 7);
  const data = await userAuthendication({
    ...req.body,
    password: hasspassword,
  });

  const email = await userAuthendication.findOne({ email: req.body.email });

  if (email) return res.json("email already exists ");

  const savedata = await data.save();

  res.json({ datas: savedata, msg: "register successfuly" });
};

const update_data = async (req, res) => {
  const update = await userAuthendication.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.json(update);
};

const Delete_data = async (req, res) => {
  const del = await userAuthendication.findByIdAndDelete(req.params.id);

  res.json("delete successfull");
};

const get_data = async (req, res) => {
  // token jwt.verify
  jwt.verify(res.token, process.env.TOKEN, async (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      // remove the password
      const data = await userAuthendication.find().select(["-password"]);

      res.json(data);
    }
  });
};

const validUser = (req, res, next) => {
  const token = req.header("auth");
  res.token = token;
  next();
};
const Login = async (req, res) => {
  try {
    const useremail = await userAuthendication.findOne({
      email: req.body.email,
    });

    if (!useremail) return res.status(400).json("email is not valid");

    const password_data = await bcrypt.compare(
      req.body.password,
      useremail.password
    );

    if (!password_data) return res.status(400).json("password is not valid");

    const token = jwt.sign({ email: useremail.email }, process.env.TOKEN);

    //   res.json({ token_create: token, msg: "!login success" });
    res.header("auth", token).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  postData,
  update_data,
  Delete_data,
  Login,
  get_data,
  validUser,
};
