const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  avatar: { type: String, required: false },
});

module.exports = mongoose.model("Customer", postSchema);
