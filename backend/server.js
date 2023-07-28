const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });
require("./db");

const routes_auth = require("./routes/auth");
const routes_general = require("./routes/general");

const app = express();
app.use(cors({credentials: true, origin: process.env.CLIENT}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", routes_auth);
app.use("/api/general", routes_general);

app.listen(process.env.PORT || 80, () => {
  console.log(`connected to port ${process.env.PORT || 80}`);
});