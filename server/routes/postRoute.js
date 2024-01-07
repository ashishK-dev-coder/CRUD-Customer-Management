const express = require("express");
const post_route = express(); // Use express.Router() for route handling
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const postController = require("../controllers/postController");

// Use express.json() instead of bodyParser.json()
post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images) from the public directory
post_route.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.resolve() for better path resolution
    cb(null, path.resolve(__dirname, "../public/postImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Define your routes using post_route
post_route.post(
  "/create-post",
  upload.single("avatar"),
  postController.createPost
);
post_route.get("/get-post", postController.getPosts);
post_route.get("/delete-post/:id", postController.deletePost);
post_route.post(
  "/update-post",
  upload.single("avatar"),
  postController.updatePost
);

module.exports = post_route;
