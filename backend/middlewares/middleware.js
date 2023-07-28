const { initializeApp } = require("firebase/app");
const {getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require("../firebase-config");
const firebase_app = initializeApp(firebaseConfig);
const jwt = require("jsonwebtoken");

const User = require('../models/User');

exports.restrict = async (req, res, next) => {
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
        req._id = info._id;
        req.name = user.name;
        next();
      }
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ success: false, message: "Internal sever error" });
    }
  };

  exports.uploadInFirebase = (req, res, next) => {
    const file = req.file;
    const fileName = Date.now() + '-' + file.originalname;
    const storage = getStorage(firebase_app);
    const storageRef = ref(storage, 'uploads/' + fileName);

    uploadBytes(storageRef, file.buffer).then(() => {
      getDownloadURL(storageRef)
      .then((url) => {
        req.image_url=url;
        next();
      })
      .catch((error) => {
        console.log(error);
        return res
        .status(500)
        .json({ success: false, message: "Upload Failed" });
      });
    }).catch((error)=>{
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Upload Failed" });
    });
  }