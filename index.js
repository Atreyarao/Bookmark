const express = require("express");
const mongoose = require("mongoose");
const bodyparse = require("body-parser");
const cors = require("cors");
const bookmark = require("./routes/bookmark");
const tags = require("./routes/tags");
const tagsto = require("./routes/tagBookmark");
const app = express();
const path = require("path");
app.use(cors());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());


var str = "mongodb+srv://admin:test123@cluster0.uxrmi.gcp.mongodb.net/bookmarkDB?retryWrites=true&w=majority"
// mongodb://localhost:27017/bookmarkDB
mongoose.connect(str, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongo bd started");
}).catch((err) => {
    console.log(err);
})




app.use("/", bookmark);
app.use("/", tags);
app.use("/", tagsto);


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server up and running on port ${port}!`);

});