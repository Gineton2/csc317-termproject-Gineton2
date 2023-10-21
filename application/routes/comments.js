const express = require("express");
const router = express.Router();
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const { create } = require("../models/Comments");

router.post('/create', (req, res, next) => {
    if (!req.session.username) {
        errorPrint("User must be logged in to comment.");
        res.json({
            code:-1,
            status: "danger",
            message: "User must be logged in to comment."
        })
    } else {
        let { comment, postId } = req.body;
        let username = req.session.username;
        let userId = req.session.userId;

        create(comment, userId, postId)
            .then((wasSuccessful) => {
                if (wasSuccessful != -1) {
                    successPrint("Comment was created by ${username}");
                    res.json({
                        code: 1,
                        status: "success",
                        message: "Comment was created",
                        comment: comment,
                        username: username
                    })
                } else {
                    errorPrint("Comment was not created");
                    res.json({
                        code: -1,
                        status: "error",
                        message: "Comment was not created"
                    })
                }
            }).catch((err) => next(err));
    }
});

module.exports = router;