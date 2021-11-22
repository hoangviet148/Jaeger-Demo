const User = require("../models/userModel");

module.exports.register = async (req, res) => {
    try {
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
        await newUser.save();
        return res.status(201).json({ newUser });
    } catch (err) {
        console.log(err + " ");
        return res.status(400).json(err + " ");
    }
}

module.exports.login = async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const user = await User.findOne({ name: name });
        console.log(user)
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
}