const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        director: { type: String, required: true },
        premieredYear: { type: Number, required: true },
        uploadByUserName: { type: String, required: true }, 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
