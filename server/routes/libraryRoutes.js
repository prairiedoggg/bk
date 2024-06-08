const express = require("express");
const router = express.Router();
const Library = require("../models/librarySchema");

// 모든 도서관 정보 조회
router.get("/", async (req, res, next) => {
  try {
    const libraries = await Library.find().select(
      "-_id name district address phone url hours holidays latitude longitude"
    );
    res.json(libraries);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
