const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
    });

    const createdUser = await user.save();

    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);

    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 86400000),
        sameSite: 'none',
        httpOnly: true,
        secure: true
      })
      .status(201)
      .json({ success: true, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const user = req.body;
    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "sign in with correct credentials" });
    } else {
      const match = await bcrypt.compare(user.password, userData.password);

      if (match) {
        const token = jwt.sign(
          { _id: userData._id },
          process.env.JWT_SECRET
        );

        return res
          .cookie("token", token, {
            expires: new Date(Date.now() + 86400000),
            sameSite:'none',
            httpOnly: true,
            secure:true
          })
          .status(200)
          .json({ success: true, message: "process successful" });
      } else {
        return res
          .status(400)
          .json({
            success: false,
            message: "sign in with correct credentials",
          });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
});

router.get('/getUser',async (req, res)=>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id: info._id });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized User" });
      }
      return res
      .status(200)
      .json({ success: true, data:{_id:info._id, name:user.name}, message: "process successful" });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal sever error" });
  }
})

module.exports = router;