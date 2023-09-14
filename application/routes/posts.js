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

var uploader = multer({ storage: storage });


router.post('/createPost', uploader.single("imageUpload"), (req, res, next) => {
    let imageUploaded = req.file.path;
    let imageAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + imageAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userID = req.session.userID;

    /*     TODO: server validation (eg express validator)
        if insert statement values are undefinedd, mysql. will fail
        with: BIND parameters cannot be undefined */

    sharp(imageUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            const baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUES (?, ?, ?, ?, now(), ?)';
            console.log(baseSQL, [title, description, imageUploaded, destinationOfThumbnail, fk_userID]);
            return db.execute(baseSQL, [title, description, imageUploaded, destinationOfThumbnail, fk_userID]);
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                req.flash('success', 'Your post was created successfully.');
                // res.redirect('/'); //TODO: (optional) route to individually created post
                res.json({ status: "OK", "redirect": "/" });
            } else {
                // throw new PostError(
                //     "Post could not be created",
                //     "/post-image",
                //     500
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
router.get('/search', (req, res, next) => {
    let searchQuery = req.query.search;
    if (!searchQuery) {
        res.send({
            resultStatus: "info",
            message: "No search term given",
            results: []
        });
    } else {
        let baseSQL = "SELECT id, title, description, thumbnail, \
        concat_ws(' ', title, description) AS posts_haystack \
        FROM posts \
        HAVING posts_haystack LIKE ?;";
        let sqlReadySearchQuery = "%" + searchQuery + "%";
        db.execute(baseSQL, [sqlReadySearchQuery])
            .then(([results, fields]) => {
                if (results && results.length) {
                    res.send({
                        resultsStatus: "info",
                        message: `${results.length} results found`,
                        results: results
                    });
                } else {
                    db.query(
                        'SELECT id, title, description, thumbnail, created \
                        FROM posts \
                        ORDER BY created DESC \
                        LIMIT 8;',[])
                    .then(([results, fields]) => {
                        res.send({
                            resultsStatus: "info",
                            message: "No results found. Here are some recent posts instead!",
                            results: results
                        });
                    })
                }
            })
            .catch((err) => next(err))
    }
});

module.exports = router;