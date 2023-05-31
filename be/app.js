const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images");
const cvRoute = require("./routes/cv");

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/posts", postsRoute);

// Add headers
app.use(cors());
app.options("*", cors());

app.use("/user", userRoute);
app.use("/cv", cvRoute);

app.use("/images", imageRoute);

module.exports = app;
