const express = require("express");
const router = express.Router();
const productControllers = require("./productControllers.js");

//Products:
router.get("/products*", productControllers.get);

module.exports = router;
