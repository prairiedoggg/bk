const mongoose = require("mongoose");

const parkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    managing_department: { type: String, required: true },
    phone: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

const Park = mongoose.model("Park", parkSchema);

module.exports = Park;
