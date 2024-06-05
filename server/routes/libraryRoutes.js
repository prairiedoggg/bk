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

module.exports = router;
