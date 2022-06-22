const User = require("../models/userModel");
const opentracing = require("opentracing");
const tracer = opentracing.globalTracer();

module.exports.register = async (req, res) => {
  try {
    // You can re-use the parent span to create a child span
    const span = tracer.startSpan("register", { childOf: req.span });
    const { name, password } = req.body;
    const nameExists = await User.findOne({ name: name });
    if (nameExists) {
      return res.status(400).json({ name: "name is exists" });
    }
    // save user
    let newUser = new User({
      name: name,
      password: password,
    });
    let response = await newUser.save();
    span.setTag('response', response)
    span.finish()
    return res.status(201).json({ newUser });
  } catch (err) {
    console.log(err + " ");
    return res.status(400).json(err + " ");
  }
};

module.exports.login = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const user = await User.findOne({ name: name });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Name not found" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    res.json({ message: "login success!" });
  } catch (err) {
    console.log(err + " ");
    return res.status(400).json(err + " ");
  }
};
