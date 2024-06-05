const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    library: { type: Schema.Types.ObjectId, ref: "Library", required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
