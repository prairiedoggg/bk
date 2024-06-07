const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Review = require("../models/reviewSchema");

// 프로필 편집
router.put("/:userId/profile", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, comments, pictureUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profile: { name, comments, pictureUrl } },
      { new: true }
    );

    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 찜해둔 도서관 목록
router.get("/:userId/favoriteLibraries", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("favoriteLibraries");
    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
    res.json(user.favoriteLibraries);
  } catch (error) {
    next(error);
  }
});

// 도서관 찜하기
router.post("/:userId/favoriteLibraries/:libraryId", async (req, res, next) => {
  try {
    const { userId, libraryId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");

    if (!user.favoriteLibraries.includes(libraryId)) {
      user.favoriteLibraries.push(libraryId);
      await user.save();
      res.status(200).send("도서관을 추가했습니다.");
    } else {
      res.status(400).send("이미 찜한 도서관입니다.");
    }
  } catch (error) {
    next(error);
  }
});

// 찜한 도서관 삭제
router.delete(
  "/:userId/favoriteLibraries/:libraryId",
  async (req, res, next) => {
    try {
      const { userId, libraryId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");

      user.favoriteLibraries = user.favoriteLibraries.filter(
        (id) => id.toString() !== libraryId
      );
      await user.save();
      res.status(200).send("도서관을 삭제했습니다.");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
