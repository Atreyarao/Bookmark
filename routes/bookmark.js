const express = require("express");
const route = express.Router();
const isEmpty = require("is-empty");
const { bookmark, tag } = require("../Models/bookmark");
//const { tag } = require("../Models/bookmark");


route.post("/addBookmark", (req, res) => {
    //console.log("called")
    var { link, title, publisher } = req.body;
    if (isEmpty(link)) {
        res.json({ err: "Link cannot be empty" });
        return;
    }
    if (isEmpty(title)) {
        res.json({ err: "Title cannot be left empty" });
        return;
    }
    if (isEmpty(publisher)) {
        publisher = "Unknown1";
    }
    var time = new Date();
    time = Math.floor(time / 1000).toString()

    const newBookmark = new bookmark({
        Link: link,
        Title: title,
        Publisher: publisher,
        TimeCreated: time,
        TimeUpdated: time,
        Tags: []
    })
    newBookmark.save((er) => {

        if (er) res.json({ err: "Bookmark already exist" }); else res.json({ success: "Bookmark Created!" });
        return;
    })


})

route.post("/deleteBookmark", (req, res) => {
    const { name } = req.body;
    if (isEmpty(name)) {
        res.json({ err: "Title of the Bookmark cannot be empty" });
        return;
    }
    bookmark.deleteOne({ Title: name }, (err) => {
        if (err) console.log(err); else res.json({ success: "Deleted" });
    })
})
route.get("/getBookmarks", (req, res) => {
    //console.log("called")
    bookmark.find({}).then(result => {
        //  console.log(result);
        res.json(result);
    })
})
module.exports = route