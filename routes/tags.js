const express = require("express");
const route = express.Router();
const { tag } = require("../Models/bookmark");
const isEmpty = require("is-empty");


route.post("/addTag", (req, res) => {
    const { title } = req.body;
    if (isEmpty(title)) {
        res.json({ err: "Please Enter the Title" });
        return;
    }

    tag.findOne({ Title: title }).then((data) => {
        if (data) {
            res.json({ err: "TagName '" + title + "' already exist" });
            return;
        }
        var time = Date.now();
        const t = new tag({
            Title: title,
            TimeCreated: time,
            TimeUpdated: time
        })
        t.save((err) => {
            if (err) console.log(err); else res.json({ success: "Tag added!" });
            return;
        })
    })
})

route.post("/deleteTag", (req, res) => {
    const { name } = req.body;
    if (isEmpty(name)) {
        res.json({ err: "Tag Title cannot be empty!" });
        return;
    }
    tag.findOne({ Title: name }).then(result => {
        // console.log(result);
        if (!result) {
            res.json({ err: "No tag found of name '" + name + "'" })
            return;
        } else {
            tag.deleteOne({ Title: name }, (err) => {
                if (err) console.log(err); else res.json({ success: "Tag '" + name + "' Deleted!" })
            })
        }
    })

})

route.get("/getTags", (req, res) => {
    tag.find({}).then(result => {
        res.json(result);
    })
})

module.exports = route;