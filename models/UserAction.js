const mongoose = require("mongoose");

const userActionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model("UserAction", userActionSchema);
