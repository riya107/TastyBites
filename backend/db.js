const mongoose=require("mongoose");
const Recipe = require('./models/Recipe');
const User= require('./models/User');
const bcrypt = require("bcryptjs");
mongoose.connect(process.env.DB).then(()=>{
    // (async () => {
    //     await Recipe.updateMany({},{rating:5,rating_count:0,comments:[]});
    //   })();
    console.log("connection successful to DB");
}).catch((err)=>{
    console.log(err);
});