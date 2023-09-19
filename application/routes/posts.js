const express = require('express');
const router = express.Router();
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const sharp = require('sharp');
const multer = require('multer');
const crypto = require('crypto');
const PostModel = require('../models/Posts');
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

var uploader = multer({ storage: storage });


router.post('/createPost', uploader.single("imageUpload"), (req, res, next) => {
    let imageUploaded = req.file.path;
    let imageAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + imageAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userID;

    /*     TODO: server validation (eg express validator)
        if insert statement values are undefinedd, mysql. will fail
        with: BIND parameters cannot be undefined */

    sharp(imageUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            return PostModel.create(title, description, imageUploaded, destinationOfThumbnail, fk_userId);
        })
        .then((postWasCreated) => {
            if (postWasCreated) {
                req.flash('success', 'Your post was created successfully.');
                // res.redirect('/'); //TODO: (optional) route to individually created post
                res.json({ status: "OK", "redirect": "/" });
            } else {
                // throw new PostError(
                //     "Post could not be created",
                //     "/post-image",
                //     200
                // );
                req.flash('error', 'Your post could not be created.');
                res.json({ status: "ERROR", "redirect": "/post-image" });
            }
        })
        .catch((err) => {
            if (err instanceof PostError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        })
});

//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => {
    try {
        let searchQuery = req.query.search;
        if (!searchQuery) {
            res.send({
                message: "No search term given",
                results: []
            });
        } else {
            let results = await PostModel.search(searchQuery);
            if (results && results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                    message: "No results found. Here are some recent posts instead!",
                    results: results
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;