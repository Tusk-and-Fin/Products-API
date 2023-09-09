require("dotenv").config();
const express = require("express");
const path = require("path");
const compression = require("compression");
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require("./routes.js");

//app.use(compression());
app.use(express.json());
app.use("/data", routes);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);