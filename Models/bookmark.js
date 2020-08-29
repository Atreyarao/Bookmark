const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const Tag = new Schema({
    Title: {
        type: String,

    },
    TimeCreated: {
        type: String
    },
    TimeUpdated: {
        type: String
    }
})


//Tag.plugin(uniqueValidator);
const Bookmark = new Schema({
    Link: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    Title: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    TimeCreated: {
        type: String
    },
    TimeUpdated: {
        type: String
    },
    Publisher: {
        type: String
    },
    Tags: []

});
Bookmark.plugin(uniqueValidator);
bookmark = mongoose.model("bookmarkDB", Bookmark);

tag = mongoose.model("TagDB", Tag);

module.exports = {
    bookmark,
    tag
};