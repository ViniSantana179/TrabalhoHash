const mongoose = require("mongoose");

const File = mongoose.model("File", {
  name: { type: String, required: true },
  hashContent: { type: String, required: true },
});

module.exports = File;
