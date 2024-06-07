const express = require("express");
const router = express.Router();
const Review = require("../models/reviewSchema");

// 리뷰 목록 조회
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("user").populate("library");
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// 특정 유저의 리뷰 목록 조회
router.post("/user", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const reviews = await Review.find({ user: userId }).populate("library");
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// 리뷰 작성
router.post("/", async (req, res, next) => {
  try {
    const { userId, libraryId, rating, comment } = req.body;

    const review = new Review({
      user: userId,
      library: libraryId,
      rating,
      comment
    });

    await review.save();
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// 리뷰 삭제
router.delete("/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send("리뷰를 삭제했습니다.");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
