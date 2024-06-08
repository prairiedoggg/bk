const express = require("express");
const router = express.Router();
const Park = require("../models/parkSchema");

// 공원 위치 데이터를 반환하는 엔드포인트
router.get("/", async (req, res, next) => {
  try {
    // 공원 정보를 조회하고 일부 필드를 선택
    const data = await Park.find().select(
      "-_id name district address managing_department phone latitude longitude"
    );
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    next(error);
  }
});

module.exports = router;
