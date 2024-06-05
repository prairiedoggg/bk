const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String },
    email: { type: String, require: true, unique: true },
    profile: { name: String, comments: String, pictureUrl: String },
    favoriteLibraries: [{ type: Schema.Types.ObjectId, ref: "Library" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("User", userSchema);
