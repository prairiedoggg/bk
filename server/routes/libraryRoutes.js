const express = require("express");
const router = express.Router();
const Library = require("../models/librarySchema");

// 모든 도서관 정보 조회
router.get("/", async (req, res, next) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (error) {
    next(error); // next를 사용하여 에러 핸들링
  }
});

// 특정 도서관 정보 조회 (평균 별점 포함)
router.get("/:libraryId", async (req, res, next) => {
  try {
    const { libraryId } = req.params;
    const library = await Library.findById(libraryId);

    if (!library) {
      return res.status(404).send("도서관을 찾을 수 없습니다.");
    }

    res.json(library);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
