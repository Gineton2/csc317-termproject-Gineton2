const express = require("express");
const router = express.Router();
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const { create } = require("../models/Comments");

router.post('/create', (req, res, next) => {
    // temporary for testing
    console.log(req.body);
    res.json("Comment received");
    // TODO: complete implementation
})

module.exports = router;