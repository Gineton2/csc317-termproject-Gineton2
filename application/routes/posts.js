const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const sharp = require('sharp');
const multer = require('multer');
const crypto = require('crypto');
const PostError = require('../helpers/error/PostError');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(11).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});


router.post('/createPost', uploader.single("imageUpload"), (req, res, next) => {
    console.log(req);
    res.send("Post created");
});

module.exports = router;