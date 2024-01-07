const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  "mongodb+srv://programmingpr12:Ashish12@cluster0.obs97he.mongodb.net/?retryWrites=true&w=majority";

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose.connect(MONGODB_URI);

// Routes----
const postRoute = require("./routes/postRoute");
app.use("/api", postRoute);

// Error handling middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
  next();
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  // next();

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
