const express = require("express");
const route = express.Router();
const isEmpty = require("is-empty");
const { tag, bookmark } = require("../Models/bookmark");


route.post("/addTagToBookmark", (req, res) => {
    const { tagName, bookmarkName } = req.body;
    var id;
    if (isEmpty(tagName)) {
        res.json({ err: "Enter the Tag Title" });
        return;
    }
    if (isEmpty(bookmarkName)) {
        res.json({ err: "Enter the Bookmark Title" });
        return;
    }
    tag.findOne({ Title: tagName }).then((data1) => {
        if (!data1) {
            res.json({ err: "Tag Name '" + tagName + "' does not exist!" });
            return;
        } else {
            bookmark.findOne({ Title: bookmarkName }).then((data) => {

                if (!data) {
                    res.json({ err: "Book Mark '" + bookmarkName + "' doen not exist" });
                    return;
                }
                id = data._id;
                bookmark.find({ "Tags._id": data1._id }).then(result1 => {
                    // console.log(result1)
                    if (!isEmpty(result1)) {
                        res.json({ err: "Tag '" + tagName + "' Already exist in Bookmark '" + bookmarkName + "'" });
                    } else {
                        bookmark.updateOne({ _id: id }, { $push: { "Tags": data1 } }).then(result => {
                            res.json({ success: "Tag added to book mark '" + bookmarkName + "'" });
                        })
                    }
                })


            })
        }
    })
})


route.post("/removeTag", (req, res) => {
    const { tagName, bookmarkName } = req.body;
    if (isEmpty(tagName)) {
        res.json({ err: "Enter the Tag Title" });
        return;
    }
    if (isEmpty(bookmarkName)) {
        res.json({ err: "Enter the Bookmark Title" });
        return;
    }
    bookmark.find({ Title: bookmarkName }).then(result => {
        if (isEmpty(result)) {
            res.json({ err: "Bookmark does not exist" });
            return;
        }
        bookmark.updateMany({}, { $pull: { Tags: { Title: tagName } } }).then(result1 => {
            //console.log(result1);
            if (result1.nModified === 0) {
                res.json({ err: "No tag found of name '" + tagName + "' in the bookmark '" + bookmarkName + "'" })
                return;
            }
            res.json({ success: "Done!" });
        })
    })

})

module.exports = route;